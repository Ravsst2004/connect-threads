import { buttonVariants } from "../ui/button";
import DialogWrapper from "./dialog-wrapper";
import EditForm from "./edit-form";
import { auth } from "@/auth";

const EditDialog = async () => {
  const session = await auth();

  return (
    <DialogWrapper
      dialogTitle="Edit Profile"
      dialogTrigerContent={<h1>Edit Profile</h1>}
      dialogTriggerClassname={`${buttonVariants({
        variant: "default",
      })} mt-4 w-full`}
    >
      <EditForm email={session?.user?.email} />
    </DialogWrapper>
  );
};

export default EditDialog;
