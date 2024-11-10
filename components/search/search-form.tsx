"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { searchSchema } from "@/lib/validations/searchSchema";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    // TODO: handle search user by username
    router.push(`/search?query=${encodeURIComponent(values.query)}`);
  };

  return (
    <section className="px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-2">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Search
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default SearchForm;
