import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const lmsApi = createApi({
  reducerPath: "lmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/api`,
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
    getAllBooks: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 8 } = {}) => ({
        url: "/books",
        params: { page, limit },
      }),
      providesTags: ["books"],
    }),

    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
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
    borrowSummary: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 8 } = {}) => ({
        url: "/borrow",
        params: { page, limit },
      }),
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
