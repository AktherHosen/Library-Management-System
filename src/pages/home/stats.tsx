import { useBorrowSummaryQuery, useGetAllBooksQuery } from "@/redux/api/lmsApi";

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
interface BorrowItem {
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
  };
}

const Stats = () => {
  const { data: booksData, isLoading: booksLoading } = useGetAllBooksQuery({
    page: 1,
    limit: 1000,
  });

  const { data: borrowData, isLoading: borrowLoading } = useBorrowSummaryQuery({
    page: 1,
    limit: 1000,
  });

  if (booksLoading || borrowLoading) return null;

  const totalBooks = booksData?.data?.length || 0;
  const totalCopies =
    booksData?.data?.reduce(
      (acc: number, book: Book) => acc + book.copies,
      0
    ) || 0;

  const borrowedBooks =
    borrowData?.data?.reduce(
      (acc: number, item: BorrowItem) => acc + item.totalQuantity,
      0
    ) || 0;

  return (
    <section className="grid grid-cols-2 md:grid-cols-3 gap-6 my-10">
      <div className="rounded-xl bg-gradient-to-r from-sky-100 to-indigo-100 p-6 text-center shadow">
        <h3 className="text-2xl font-bold text-sky-600">{totalBooks}</h3>
        <p className="text-sm text-muted-foreground">Total Books</p>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 p-6 text-center shadow">
        <h3 className="text-2xl font-bold text-green-600">{totalCopies}</h3>
        <p className="text-sm text-muted-foreground">Total Copies</p>
      </div>

      <div className="rounded-xl bg-gradient-to-r from-orange-100 to-amber-100 p-6 text-center shadow">
        <h3 className="text-2xl font-bold text-orange-600">{borrowedBooks}</h3>
        <p className="text-sm text-muted-foreground">Borrowed</p>
      </div>
    </section>
  );
};

export default Stats;
