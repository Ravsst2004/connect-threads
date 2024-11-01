import DialogWrapper from "./dialog-wrapper";
import EditForm from "./edit-form";
import { auth } from "@/auth";

const EditDialog = async () => {
  const session = await auth();

  return (
    <DialogWrapper triggerText="Edit Profile">
      <EditForm email={session?.user?.email} />
    </DialogWrapper>
  );
};

export default EditDialog;
