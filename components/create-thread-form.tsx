"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { convertFileToBase64 } from "@/lib/actions/convertFileToBase64 ";
import { createThread } from "@/lib/actions/createThread";
import { createThreadSchema } from "@/lib/validations/createThreadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateThreadFormProps {
  userId: string | undefined | null;
}

const CreateThreadForm = ({ userId }: CreateThreadFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File[] | null>(null);
  const form = useForm<z.infer<typeof createThreadSchema>>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      userId: userId || "",
      content: "",
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof createThreadSchema>) => {
    // TODO: handle multiple images upload
    if (selectedImage && selectedImage.length > 0) {
      values.images = await Promise.all(
        Array.from(selectedImage).map((file) => convertFileToBase64(file))
      );
      // console.log(values.image);
    } else {
      values.images = [];
    }

    const result = await createThread(values);

    if (result) {
      form.reset();
      toast({
        description: "Profile updated successfully",
        title: "Success",
        variant: "default",
      });
      setTimeout(() => [redirect("/")], 1000);
    }
  };

  return (
    <section className="px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-2">
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem hidden>
                <FormControl>
                  <Input type="text" className="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="What's happening?"
                    className="h-64 border-none rounded-none focus:outline-none focus:ring-0 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedImage && selectedImage.length > 0 && (
            <div className="flex justify-center items-center flex-wrap gap-2">
              {selectedImage.map((image, index) => (
                <div
                  key={index}
                  className="w-44 h-44 rounded-sm overflow-hidden flex items-center justify-center"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    width={80}
                    height={80}
                    alt="Selected"
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          )}

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    multiple
                    accept="image/*"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(e.target.files);
                      setSelectedImage(files || null);
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
            <FileImage />
          </label>

          <Button type="submit" className="w-full">
            Post
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateThreadForm;
