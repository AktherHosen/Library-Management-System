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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  description?: string;
  available: boolean;
}

type BorrowBookProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: Book;
};

interface BorrowFormData {
  quantity: number;
  dueDate: string;
}

export function BorrowBook({ open, onOpenChange, book }: BorrowBookProps) {
  const [formData, setFormData] = useState<BorrowFormData>({
    quantity: 1,
    dueDate: "",
  });
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setFormData({ quantity: 1, dueDate: "" });
    }
  }, [open, book]);

  const handleChange = (field: keyof BorrowFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.quantity < 1) {
      toast.error("Quantity must be at least 1!");
      return;
    }

    if (formData.quantity > book.copies) {
      toast.error(`Cannot borrow more than ${book.copies} copies!`);
      return;
    }

    if (!formData.dueDate) {
      toast.error("Please select a due date!");
      return;
    }

    try {
      await borrowBook({
        book: book._id,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();

      toast.success(`Successfully borrowed ${formData.quantity} copies!`);
      navigate("/borrow-summary");
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to borrow book.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
          <DialogDescription>
            Borrow this book by selecting quantity and due date.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

        <p className="mt-2 text-sm text-muted-foreground">
          Available copies: {book.copies}
        </p>
      </DialogContent>
    </Dialog>
  );
}
