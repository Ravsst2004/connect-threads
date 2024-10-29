import { auth } from "@/auth";
import React from "react";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      {session?.user?.name}
      <p>{JSON.stringify(session)}</p>
    </div>
  );
};

export default Home;
