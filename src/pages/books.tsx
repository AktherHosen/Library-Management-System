import { Limit } from "@/components/common/limit";
import { Paginations } from "@/components/common/paginations";
import { BorrowBook } from "@/components/home/borrow-book";
import { EditBook } from "@/components/home/edit-book";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // ✅ ShadCN Button
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteBookMutation, useGetAllBooksQuery } from "@/redux/api/lmsApi";
import { BookOpen, Edit, Info, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

const getInitials = (name: string) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
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

const SkeletonBookCard = () => (
  <Card className="relative flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow rounded-2xl p-4 animate-pulse">
    <CardHeader className="flex flex-col space-y-2 pb-2">
      <Skeleton className="h-5 w-3/4 rounded" />
      <Skeleton className="h-4 w-full rounded" />
    </CardHeader>
  </Card>
);

const Books = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { data, isLoading } = useGetAllBooksQuery({ page, limit });
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

  return (
    <div>
      <section>
        <div className="flex justify-between items-center ">
          <SectionTitle
            title="All Books"
            subtitle="Browse through our entire collection"
          />
          <Limit
            limit={limit}
            onChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => (
                <SkeletonBookCard key={i} />
              ))
            : data?.data?.map((book: Book) => (
                <Card
                  key={book._id}
                  className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Header */}
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold line-clamp-1">
                      {book.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 line-clamp-2">
                      {book.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Author & Availability */}
                  <CardContent className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={book.author || ""}
                          alt={book.author}
                        />
                        <AvatarFallback>
                          {getInitials(book.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{book.author}</p>
                        <p className="text-xs text-gray-400">
                          Copies: {book.copies}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={book.copies > 0 ? "secondary" : "destructive"}
                      className="text-xs px-2 py-1"
                    >
                      {book.copies > 0 ? "Available" : "Unavailable"}
                    </Badge>
                  </CardContent>

                  <CardFooter className="flex flex-wrap gap-2  border-t border-gray-100">
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
                      onClick={() => setEditingBook(book)}
                      variant="secondary"
                      className="flex-1 justify-center gap-2"
                    >
                      <Edit size={16} /> Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(book._id)}
                      variant="destructive"
                      className="flex-1 justify-center gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </Button>
                    <Button
                      disabled={book.copies === 0 || !book.available}
                      onClick={() => setBorrowingBook(book)}
                      variant="default"
                      className="flex-1 justify-center gap-2"
                    >
                      <BookOpen size={16} /> Borrow
                    </Button>
                  </CardFooter>
                </Card>
              ))}
        </div>

        <div className="flex justify-self-end my-4">
          {data?.pagination && (
            <Paginations
              page={page}
              totalPages={data.pagination.totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </section>

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
    </div>
  );
};

export default Books;
