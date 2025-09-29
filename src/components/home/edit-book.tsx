import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateBookMutation } from "@/redux/api/lmsApi";
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
export interface Book extends BookFormData {
  _id: string;
}

export function EditBook({
  open,
  onOpenChange,
  book,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  book: Book;
}) {
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleSubmit = async (formData: BookFormData) => {
    try {
      const res = await updateBook({ id: book._id, ...formData }).unwrap();
      if (res.success) toast.success(res.message);
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to edit book");
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
