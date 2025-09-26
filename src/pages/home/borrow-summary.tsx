import { Loader } from "@/components/ui/loader";
import { SectionTitle } from "@/components/ui/section-title";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBorrowSummaryQuery } from "@/redux/api/lmsApi";

// TypeScript interface
interface BorrowSummaryItem {
  bookId: string;
  totalQuantity: number;
  book: {
    title: string;
    isbn: string;
    author?: string;
  };
}

interface BorrowSummaryResponse {
  success: boolean;
  data: BorrowSummaryItem[];
}

const BorrowSummary = () => {
  const { data, isLoading, error } = useBorrowSummaryQuery<
    void,
    BorrowSummaryResponse
  >(undefined);

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Borrow Summary"
        subtitle="All borrowed books and their total quantities"
      />

      <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
        <Table className="w-full min-w-[600px]">
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="text-left">Book Title</TableHead>
              <TableHead className="text-left">ISBN</TableHead>
              <TableHead className="text-left">
                Total Quantity Borrowed
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Loader message="Loading borrow summary..." />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-4 text-red-600"
                >
                  Failed to load summary.
                </TableCell>
              </TableRow>
            ) : data?.data?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-4 text-muted-foreground"
                >
                  No borrowed books found.
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((item) => (
                <TableRow
                  key={item.bookId}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <TableCell>{item.book.title}</TableCell>
                  <TableCell>{item.book.isbn}</TableCell>
                  <TableCell className="font-semibold">
                    {item.totalQuantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BorrowSummary;
