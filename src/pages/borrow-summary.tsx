import { Limit } from "@/components/common/limit";
import { Paginations } from "@/components/common/paginations";
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
import { useState } from "react";

interface BorrowItem {
  totalQuantity: number;
  bookId: string;
  book: {
    title: string;
    isbn: string;
  };
}

const BorrowSummary = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);

  const { data, isLoading, error } = useBorrowSummaryQuery({ page, limit });

  return (
    <div>
      <div className="flex justify-between items-center">
        <SectionTitle
          title="Borrow Summary"
          subtitle="All borrowed books and their total quantities"
        />
        <Limit
          limit={limit}
          onChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1);
          }}
        />
      </div>

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
            ) : data?.data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-4 text-muted-foreground"
                >
                  No borrowed books found.
                </TableCell>
              </TableRow>
            ) : (
              data.data.map((item: BorrowItem) => (
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

      <div className="flex justify-self-end my-4">
        {data?.pagination && (
          <Paginations
            page={page}
            totalPages={data.pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default BorrowSummary;
