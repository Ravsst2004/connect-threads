"use client";

import SearchForm from "@/components/search/search-form";
import UserCard from "@/components/search/user-card";
import { User } from "@prisma/client";
import { useState } from "react";

const Search = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  console.log(users);

  return (
    <section>
      <SearchForm setUsers={setUsers} />

      <div>
        <ul>
          {users && users.length > 0 ? (
            users.map((user: User) => (
              <li key={user.id}>
                <UserCard username={user.username} name={user.name} userImage={user.image} />
              </li>
            ))
          ) : (
            <h1 className="text-center text-xl mt-10 font-bold">No results</h1>
          )}
        </ul>
      </div>
    </section>
  );
};

export default Search;
