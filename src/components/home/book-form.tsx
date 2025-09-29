import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  description?: string;
  available: boolean;
}

type BookErrors = Partial<Record<keyof BookFormData, string>>;

export function BookForm({
  initialData,
  onSubmit,
  isLoading,
}: {
  initialData?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => void | Promise<void>;
  isLoading?: boolean;
}) {
  const [formData, setFormData] = useState<BookFormData>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    genre: initialData?.genre || "",
    isbn: initialData?.isbn || "",
    copies: initialData?.copies || 1,
    description: initialData?.description || "",
    available: initialData?.available ?? true,
  });

  const [errors, setErrors] = useState<BookErrors>({});

  const handleChange = (field: keyof BookFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: BookErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.author.trim()) newErrors.author = "Author is required";
    if (!formData.genre.trim()) newErrors.genre = "Genre is required";
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (formData.copies < 1) newErrors.copies = "Copies must be at least 1";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);

      if (!initialData) {
        setFormData({
          title: "",
          author: "",
          genre: "",
          isbn: "",
          copies: 1,
          description: "",
          available: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while saving the book.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Book Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />
      {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}

      <Input
        placeholder="Author"
        value={formData.author}
        onChange={(e) => handleChange("author", e.target.value)}
      />
      {errors.author && <p className="text-xs text-red-500">{errors.author}</p>}

      <div className="flex gap-4">
        <Select
          value={formData.genre}
          onValueChange={(value) => handleChange("genre", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FICTION">Fiction</SelectItem>
            <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
            <SelectItem value="SCIENCE">Science</SelectItem>
            <SelectItem value="HISTORY">History</SelectItem>
            <SelectItem value="BIOGRAPHY">Biography</SelectItem>
            <SelectItem value="FANTASY">Fantasy</SelectItem>
          </SelectContent>
        </Select>
        {errors.genre && <p className="text-xs text-red-500">{errors.genre}</p>}

        <Input
          type="number"
          placeholder="Copies"
          value={formData.copies}
          onChange={(e) => handleChange("copies", Number(e.target.value))}
          min={1}
        />
        {errors.copies && (
          <p className="text-xs text-red-500">{errors.copies}</p>
        )}
      </div>

      <Input
        placeholder="ISBN"
        value={formData.isbn}
        onChange={(e) => handleChange("isbn", e.target.value)}
      />
      {errors.isbn && <p className="text-xs text-red-500">{errors.isbn}</p>}

      <Textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={3}
      />

      <div className="flex items-center gap-2">
        <Checkbox
          checked={formData.available}
          onCheckedChange={(checked) =>
            handleChange("available", checked ?? false)
          }
        />
        <span>Available</span>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
