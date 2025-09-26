import { BorrowBook } from "@/components/home/borrow-book";
import { EditBook } from "@/components/home/edit-book";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/lmsApi";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Utility: generate initials from a name
const getInitials = (name: string) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Books = () => {
  const { data, isLoading } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation(undefined);
  const [editingBook, setEditingBook] = useState<any | null>(null);
  const [borrowingBook, setBorrowingBook] = useState<any | null>(null);

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
      },
    });
  };

  return (
    <>
      <SectionTitle
        title="All Books"
        subtitle="Browse through our entire collection"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.map((book: any) => (
          <Card
            key={book._id}
            className="relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow rounded-2xl"
          >
            {/* Header */}
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="flex flex-col">
                <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {book.description}
                </CardDescription>
              </div>
              <Badge
                variant={book.copies > 0 ? "secondary" : "destructive"}
                className="shrink-0"
              >
                {book.copies > 0 ? `${book.copies} Available` : "Unavailable"}
              </Badge>
            </CardHeader>

            {/* Content */}
            <CardContent className="pt-0 flex items-center gap-3">
              <Avatar>
                <AvatarImage src={book.author || ""} alt={book.author} />
                <AvatarFallback>{getInitials(book.author)}</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium text-foreground">
                {book.author}
              </p>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex justify-between gap-2 border-t !pb-0">
              <button
                onClick={() => setEditingBook(book)}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="flex items-center gap-1 text-sm text-red-600 hover:underline"
              >
                <Trash2 size={16} /> Delete
              </button>
              <button
                disabled={book.copies === 0}
                onClick={() => setBorrowingBook(book)}
                className="flex items-center gap-1 text-sm text-green-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookOpen size={16} /> Borrow
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

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
    </>
  );
};

export default Books;
