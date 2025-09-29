import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAddBookMutation } from "@/redux/api/lmsApi";
import { toast } from "sonner";
import { BookForm } from "./book-form";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  description?: string;
  available: boolean;
}
export function AddBook({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [addBook, { isLoading }] = useAddBookMutation();

  const handleSubmit = async (formData: BookFormData) => {
    try {
      const res = await addBook(formData).unwrap();
      if (res.success) toast.success(res.message);
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to add book");
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
