import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    addBook: builder.mutation({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (Id) => `/book/${Id}`,
      providesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    borrowBook: builder.mutation({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ["borrow", "books"],
    }),
    borrowSummary: builder.query({
      query: () => "borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useBorrowSummaryQuery,
} = lmsApi;
