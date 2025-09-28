import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
} from "@/redux/api/lmsApi";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { BorrowBook } from "@/components/home/borrow-book";
import { EditBook } from "@/components/home/edit-book";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading } = useGetSingleBookQuery(id || "");
  const [deleteBook] = useDeleteBookMutation();

  const [editingBook, setEditingBook] = useState(null);
  const [borrowingBook, setBorrowingBook] = useState(null);

  if (isLoading) return <Loader />;
  if (!book?.data) return <p className="text-center mt-10">Book not found.</p>;

  const b = book.data;

  const handleDelete = (id: string) => {
    toast.warning("Are you sure you want to delete this book?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteBook(id).unwrap();
            toast.success("Book deleted successfully!");
          } catch (err) {
            toast.error("Failed to delete book");
            console.error(err);
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => console.log("Cancelled"),
      },
    });
  };

  return (
    <section className="max-w-4xl mx-auto px-6 ">
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/books">&larr; Back to Books</Link>
      </Button>

      <Card className="rounded-xl border border-gray-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">{b.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-gray-600">Author: {b.author}</p>
          <p className="text-sm text-gray-600">ISBN: {b.isbn || "N/A"}</p>
          <Badge
            variant={b.copies > 0 ? "secondary" : "destructive"}
            className="text-xs w-max px-2 py-1"
          >
            {b.copies > 0 ? "Available" : "Unavailable"}
          </Badge>
          <p className="text-gray-700">
            {b.description || "No description available."}
          </p>
          <p className="text-sm text-gray-500">Total Copies: {b.copies}</p>

          <div className="flex gap-2 mt-4">
            <Button
              disabled={b.copies === 0}
              onClick={() => setBorrowingBook(b)}
              variant="default"
              className="flex justify-center gap-2"
            >
              <BookOpen size={16} /> Borrow
            </Button>
            <Button
              onClick={() => setEditingBook(b)}
              variant="secondary"
              className="flex justify-center gap-2"
            >
              <Edit size={16} /> Edit
            </Button>
            <Button
              onClick={() => handleDelete(book._id)}
              variant="destructive"
              className="flex justify-center gap-2"
            >
              <Trash2 size={16} /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 🔹 Modals */}
      {editingBook && (
        <EditBook
          open={!!editingBook}
          onOpenChange={() => setEditingBook(null)}
          book={editingBook}
        />
      )}
      {borrowingBook && (
        <BorrowBook
          open={!!borrowingBook}
          onOpenChange={() => setBorrowingBook(null)}
          book={borrowingBook}
        />
      )}
    </section>
  );
}
