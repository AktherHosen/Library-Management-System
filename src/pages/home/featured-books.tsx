import { BorrowBook } from "@/components/home/borrow-book";
import { EditBook } from "@/components/home/edit-book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { SectionTitle } from "@/components/ui/section-title";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/lmsApi";
import { BookOpen, Edit, Info, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  description?: string;
  available: boolean;
}

export function FeaturedBooks() {
  const { data, isLoading } = useGetAllBooksQuery({ page: 1, limit: 4 });
  const [deleteBook] = useDeleteBookMutation();
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
        onClick: () => console.log("Cancelled"),
      },
    });
  };

  if (isLoading) return <Loader />;

  return (
    <section>
      <SectionTitle
        title="Featured Books"
        subtitle="Check out some of our popular books"
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
        {data?.data?.map((book: Book) => (
          <Card
            key={book._id}
            className="h-full flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-semibold line-clamp-1">
                {book.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-between gap-1">
              <CardDescription className="text-sm text-gray-600 line-clamp-2">
                {book.description || "No description available."}
              </CardDescription>

              <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-500">{book.author}</p>
                  {book.isbn && (
                    <p className="text-xs text-gray-400">ISBN: {book.isbn}</p>
                  )}
                </div>
                <Badge
                  variant={book.copies > 0 ? "secondary" : "destructive"}
                  className="text-xs px-2 py-1"
                >
                  {book.copies > 0 ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 border-t border-gray-100 mt-auto">
              <Button
                asChild
                variant="outline"
                className="flex-1 justify-center gap-2"
              >
                <Link to={`/books/${book._id}`}>
                  <Info size={16} /> Details
                </Link>
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setEditingBook(book);
                }}
                variant="secondary"
                className="flex-1 justify-center gap-2"
              >
                <Edit size={16} /> Edit
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete(book._id);
                }}
                variant="destructive"
                className="flex-1 justify-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </Button>
              <Button
                disabled={book.copies === 0}
                onClick={(e) => {
                  e.preventDefault();
                  setBorrowingBook(book);
                }}
                variant="default"
                className="flex-1 justify-center gap-2"
              >
                <BookOpen size={16} /> Borrow
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button
          asChild
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <Link to="/books">Browse More Books</Link>
        </Button>
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
    </section>
  );
}
