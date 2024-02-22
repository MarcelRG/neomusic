import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/@/components/ui/select";
export default function Sort() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="popularity">popularity</SelectItem>
        <SelectItem value="alphabet">alphabet</SelectItem>
        <SelectItem value="background">background</SelectItem>
      </SelectContent>
    </Select>
  );
}
