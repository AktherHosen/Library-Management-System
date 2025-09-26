import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useBorrowBookMutation } from "@/redux/api/lmsApi";
import { useState } from "react";
import { toast } from "sonner";

type BorrowBookProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: any; // shape of book data from API
};

export function BorrowBook({ open, onOpenChange, book }: BorrowBookProps) {
  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: "",
  });
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.quantity > book.copies) {
      toast.error("Quantity cannot exceed available copies!");
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");

      onOpenChange(false);
      //   router.push("/borrow-summary"); // redirect to summary page
    } catch (error) {
      console.error(error);
      toast.error("Failed to borrow book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow {book.title}</DialogTitle>
          <DialogDescription>
            Borrow this book by selecting quantity and due date.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            min={1}
            max={book.copies}
            required
          />

          <Input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            required
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Processing..." : "Confirm Borrow"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
