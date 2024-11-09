"use client";

import { FileImage } from "lucide-react";
import { convertFileToBase64 } from "@/lib/actions/convertFileToBase64 ";
import { createCommentThreadSchema } from "@/lib/validations/createCommentThreadSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MutableRefObject, useRef, useState } from "react";
import { createComment } from "@/lib/actions/threads";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";

interface CommentFormProps {
  userId: string;
  threadId: string;
  retrieveId: string;
}

const CommentForm = ({ userId, threadId, retrieveId }: CommentFormProps) => {
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

  const form = useForm<z.infer<typeof createCommentThreadSchema>>({
    resolver: zodResolver(createCommentThreadSchema),
    defaultValues: {
      userId: userId || "",
      threadId: threadId || "",
      retrieveId: retrieveId || "",
      content: "",
      image: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createCommentThreadSchema>
  ) => {
    if (selectedImage && selectedImage.length > 0) {
      values.image = await Promise.all(
        Array.from(selectedImage).map((file) => convertFileToBase64(file))
      );
    } else {
      values.image = [];
    }

    try {
      setIsLoading(true);
      const result = await createComment(values);
      setIsLoading(false);
      if (result) {
        form.reset();
        toast({
          description: "Comment created successfully",
          title: "Success",
          variant: "default",
        });
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
            name="threadId"
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
            name="retrieveId"
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
                    placeholder="What's you think?"
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
            {isLoading ? "Commenting..." : "Comment"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CommentForm;
