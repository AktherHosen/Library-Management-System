"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAddBookMutation } from "@/redux/api/lmsApi"

type AddBooksProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddBooks({ open, onOpenChange }: AddBooksProps) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [addBook, { isLoading }] = useAddBookMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addBook({ title, author }).unwrap()
      setTitle("")
      setAuthor("")
      onOpenChange(false) 
    } catch (error) {
      console.error("Failed to add book:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new book.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
