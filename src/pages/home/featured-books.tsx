import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { SectionTitle } from "@/components/ui/section-title";
import { useGetAllBooksQuery } from "@/redux/api/lmsApi";
import { Link } from "react-router-dom";

export function FeaturedBooks() {
  const { data, isLoading } = useGetAllBooksQuery({ page: 1, limit: 4 });

  if (isLoading) return <Loader />;

  return (
    <section className="">
      <SectionTitle
        title="Featured Books"
        subtitle="Check out some of our popular books"
        className="mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data?.data?.map((book: any) => (
          <Link
            key={book._id}
            to={`/books/${book._id}`}
            className="block rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-semibold line-clamp-1">
                  {book.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <CardDescription className="text-sm text-gray-600 line-clamp-2">
                  {book.description || "No description available."}
                </CardDescription>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <Badge
                    variant={book.copies > 0 ? "secondary" : "destructive"}
                    className="text-xs px-2 py-1"
                  >
                    {book.copies > 0 ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
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
    </section>
  );
}
