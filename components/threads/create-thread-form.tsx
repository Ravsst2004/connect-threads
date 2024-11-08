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
import { createThread } from "@/lib/actions/threads";
import { createThreadSchema } from "@/lib/validations/createThreadSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileImage } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MutableRefObject, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateThreadFormProps {
  userId: string | undefined | null;
}

const CreateThreadForm = ({ userId }: CreateThreadFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(
    null
  ) as MutableRefObject<HTMLTextAreaElement | null>;

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const form = useForm<z.infer<typeof createThreadSchema>>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      userId: userId || "",
      content: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof createThreadSchema>) => {
    // TODO: handle multiple images upload
    if (selectedImage && selectedImage.length > 0) {
      values.image = await Promise.all(
        Array.from(selectedImage).map((file) => convertFileToBase64(file))
      );
    } else {
      values.image = [];
    }

    try {
      setIsLoading(true);
      const result = await createThread(values);
      setIsLoading(false);
      if (result) {
        form.reset();
        toast({
          description: "Thread created successfully",
          title: "Success",
          variant: "default",
        });
        setTimeout(() => [redirect("/")], 1000);
      }
    } catch (error) {
      console.log(error);
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
                    className="h-auto border-none rounded-none focus:outline-none focus:ring-0 resize-none overflow-hidden"
                    {...field}
                    ref={(e) => {
                      field.ref(e);
                      textareaRef.current = e;
                    }}
                    onInput={handleInput}
                    style={{
                      height: "auto",
                      overflow: "hidden",
                    }}
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

          <label
            htmlFor="fileInput"
            className={`${buttonVariants({
              variant: "default",
            })} text-neutral-90  rounded-md cursor-pointer inline-flex items-center`}
          >
            <FileImage />
          </label>
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateThreadForm;
