import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

export function BookForm({ initialData, onSubmit, isLoading }: any) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Book Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => handleChange("author", e.target.value)}
        required
      />
      <Select
        value={formData.genre}
        onValueChange={(value) => handleChange("genre", value)}
      >
        <SelectTrigger>
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
      <Input
        type="text"
        placeholder="ISBN"
        value={formData.isbn}
        onChange={(e) => handleChange("isbn", e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleChange("description", e.target.value)}
        rows={3}
      />
      <Input
        type="number"
        placeholder="Copies"
        value={formData.copies}
        onChange={(e) => handleChange("copies", Number(e.target.value))}
        min={1}
        required
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.available}
          onChange={(e) => handleChange("available", e.target.checked)}
          className="h-4 w-4"
        />
        <span>Available</span>
      </label>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
