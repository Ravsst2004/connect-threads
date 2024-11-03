import { auth } from "@/auth";
import React from "react";

const Home = async () => {
  const session = await auth();

  return <div>{session?.user?.name}</div>;
};

export default Home;
