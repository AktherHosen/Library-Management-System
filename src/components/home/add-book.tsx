import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddBookMutation } from "@/redux/api/lmsApi";
import { BookForm } from "./book-form";

export function AddBook({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (formData: any) => {
    try {
      await addBook(formData).unwrap();
      onOpenChange(false);
    } catch (err) {
      console.error("Failed to add book:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new book.
          </DialogDescription>
        </DialogHeader>
        <BookForm
          initialData={{
            title: "",
            author: "",
            genre: "FICTION",
            isbn: "",
            description: "",
            copies: 1,
            available: true,
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}
