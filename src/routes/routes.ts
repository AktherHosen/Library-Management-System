import BookDetails from "@/components/home/book-details";
import Books from "@/pages/books";
import BorrowSummary from "@/pages/borrow-summary";
import Home from "@/pages/home/home";
import NotFound from "@/pages/not-found";
import { createBrowserRouter } from "react-router-dom";
import "../layout/layout";
import Layout from "../layout/layout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    ErrorBoundary: NotFound,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        Component: Books,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/books/:id",
        Component: BookDetails,
      },
    ],
  },
]);
