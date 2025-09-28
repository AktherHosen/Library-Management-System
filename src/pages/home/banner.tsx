import { AddBook } from "@/components/home/add-book";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBorrowSummaryQuery, useGetAllBooksQuery } from "@/redux/api/lmsApi";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

type BannerProps = {
  title?: string;
  subtitle?: string;
  bgImage?: string;
  onExplore?: () => void;
  onAddBook?: () => void;
};

export default function Banner({
  title = "Welcome to Campus Library",
  subtitle = "Discover, borrow and manage books effortlessly",
  bgImage,
  onExplore,
  onAddBook,
}: BannerProps) {
  const { data: books, isLoading: booksLoading } = useGetAllBooksQuery({});
  const { data: borrow, isLoading: borrowLoading } = useBorrowSummaryQuery({});
  const [openAddBook, setOpenAddBook] = useState(false);

  const totalBooks = books?.data?.length ?? 0;
  const totalBorrowed =
    borrow?.data?.reduce((sum, item) => sum + item.totalQuantity, 0) ?? 0;

  return (
    <section
      aria-label="Library hero"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-600 text-white p-6 md:p-10 lg:p-12 shadow-lg"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundBlendMode: "overlay",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-white/0 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left side */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="text-sm py-1 px-2 bg-white/10 border-white/20">
              {booksLoading ? "…" : totalBooks}
            </Badge>
            <span className="text-sm text-white/90">
              available in catalogue
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            {title}
          </h1>

          <p className="max-w-xl text-sm md:text-base text-white/90">
            {subtitle}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <Button
              onClick={(e) => {
                e.preventDefault();
                setOpenAddBook(true);
              }}
            >
              <BookOpen className="mr-2" /> Add book
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <strong className="text-white">Total Borrowed</strong>
              <span>- {borrowLoading ? "…" : totalBorrowed}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-white">Fast loans</strong>
              <span>- 2 week standard</span>
            </div>
          </div>
        </div>

        {/* Right side: Quick stats */}
        <div className="hidden lg:flex justify-end">
          <div className="w-full max-w-md">
            <Card className="bg-white/6 border-white/10">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Quick Stats
                </h3>
                <ul className="space-y-3 text-sm text-white/85">
                  <li className="flex justify-between">
                    <span>Total books borrowed</span>
                    <strong>{borrowLoading ? "…" : totalBorrowed}</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>Available books</span>
                    <strong>{booksLoading ? "…" : totalBooks}</strong>
                  </li>
                </ul>

                <div className="mt-4 flex gap-2">
                  <Button asChild variant="ghost" className="flex-1">
                    <Link to="/borrow-summary">View summary</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link to="/books">Manage books</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <AddBook open={openAddBook} onOpenChange={setOpenAddBook} />
    </section>
  );
}
