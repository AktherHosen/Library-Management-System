import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Limit = ({ limit, onChange, options = [4, 8, 12, 16] }) => {
  return (
    <Select
      value={limit.toString()}
      onValueChange={(val) => onChange(Number(val))}
    >
      <SelectTrigger className="w-16">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt.toString()}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
