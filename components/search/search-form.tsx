  "use client";

  import React, { useEffect, useState } from "react";
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
  import { usePathname, useRouter, useSearchParams } from "next/navigation";
  import { searchUser } from "@/lib/actions/search";
  import { User } from "@prisma/client";

  interface SearchFormProps {
    setUsers: React.Dispatch<React.SetStateAction<User[] | undefined>>;
  }

  const SearchForm = ({ setUsers }: SearchFormProps) => {
    const [query, setQuery] = useState<string>("");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const form = useForm<z.infer<typeof searchSchema>>({
      resolver: zodResolver(searchSchema),
      defaultValues: {
        query: "",
      },
    });

    useEffect(() => {
      const getUsers = async () => {
        const result = await searchUser(query);
        setUsers(result);
      };
      getUsers();
    }, [query, setUsers]);

    const handleSearch = async (searchTerm: string) => {
      const param = new URLSearchParams(searchParams);
      if (searchTerm) {
        param.set("query", searchTerm);
      } else {
        param.delete("query");
        setQuery("");
        setUsers(undefined);
      }
      setQuery(param.get("query") || "");
      replace(`${pathname}?${param.toString()}`);
    };

    const onSubmit = async (values: z.infer<typeof searchSchema>) => {
      handleSearch(values.query);
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
                    <Input
                      placeholder="Search user"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleSearch(e.target.value);
                      }}
                    />
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
