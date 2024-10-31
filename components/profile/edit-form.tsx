"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUser, updateUser } from "@/lib/actions/user";
import { editUserSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { redirect } from "next/navigation";

interface EditFormProps {
  email: string | undefined | null;
  onClose?: (status: boolean) => void;
}

const EditForm = ({ email, onClose }: EditFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      bio: "",
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        const userData = await getUser(email);
        form.reset({
          name: userData.name,
          username: userData.username,
          bio: userData.bio || "",
          email: userData.email,
        });
      }
    };

    fetchUserData();
  }, [email, form]);

  const onSubmit = async (values: z.infer<typeof editUserSchema>) => {
    const result = await updateUser(values);

    if (result) {
      toast({
        description: "Profile updated successfully",
        title: "Success",
        variant: "default",
      });
    }
    onClose();
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="hidden">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Type your message here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default EditForm;
