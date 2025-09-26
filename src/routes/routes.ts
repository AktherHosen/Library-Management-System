import Books from "@/pages/home/books";
import BorrowSummary from "@/pages/home/borrow-summary";
import Home from "@/pages/home/home";
import { createBrowserRouter } from "react-router-dom";
import "../layout/layout";
import Layout from "../layout/layout";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
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
    ],
  },
]);
