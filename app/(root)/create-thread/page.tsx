import { auth } from "@/auth";
import CreateThreadForm from "@/components/threads/create-thread-form";
import { prisma } from "@/prisma/db";

const CreateThread = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || undefined,
    },
    include: {
      threads: true,
    },
  });

  return (
    <section className="w-[80%] mx-auto border rounded-xl mb-28">
      <div className="p-4 border-b">Create Thread</div>
      <CreateThreadForm userId={user?.id} />
    </section>
  );
};

export default CreateThread;
