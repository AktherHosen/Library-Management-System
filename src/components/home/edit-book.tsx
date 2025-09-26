import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateBookMutation } from "@/redux/api/lmsApi";
import { BookForm } from "./book-form";

export function EditBook({
  open,
  onOpenChange,
  book,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  book: any;
}) {
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await updateBook({ id: book._id, ...formData }).unwrap();
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to update book:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>Update the book details below.</DialogDescription>
        </DialogHeader>
        <BookForm
          initialData={book}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
