"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { useEffect, useState } from "react";
import Image from "next/image";
import { BsPaperclip } from "react-icons/bs";
import { convertFileToBase64 } from "@/lib/actions/convertFileToBase64 ";

interface EditFormProps {
  email: string | undefined | null;
  onClose?: () => void;
}

const EditForm = ({ email, onClose }: EditFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      email: "",
      name: "",
      username: "",
      bio: "",
      image: undefined,
    },
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        const userData = await getUser(email);
        setCurrentImage(userData.image);
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
    setIsLoading(true);

    if (selectedImage) {
      values.image = await convertFileToBase64(selectedImage);
    }
    const result = await updateUser(values);

    if (result) {
      toast({
        description: "Profile updated successfully",
        title: "Success",
        variant: "default",
      });
    }
    if (onClose) {
      onClose();
      setIsLoading(false);
    }
  };

  const imageDisplay = (
    <>
      {selectedImage ? (
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={URL.createObjectURL(selectedImage)}
            width={80}
            height={80}
            alt="Selected"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src={currentImage || "/images/user-profile.png"}
            alt="profile"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </>
  );

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div
            className={`flex w-[100%] gap-4 p-4 rounded border border-neutral-200 flex-col items-center md:flex-row md:justify-between md:items-center`}
          >
            <div
              className={`flex  md:flex-[1] h-[fit-content] md:p-4 md:justify-between md:flex-row 
                        
            `}
            >
              {imageDisplay}
            </div>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      className="hidden"
                      id="fileInput"
                      accept="image/*"
                      onBlur={field.onBlur}
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedImage(e.target.files?.[0] || null);
                      }}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <label
              htmlFor="fileInput"
              className={`${buttonVariants({
                variant: "default",
              })} text-neutral-90  rounded-md cursor-pointer inline-flex items-center`}
            >
              <BsPaperclip />
              <span className="whitespace-nowrap">choose your image</span>
            </label>
          </div>

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

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default EditForm;
