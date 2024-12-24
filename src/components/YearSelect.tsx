import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function YearSelect() {
  return (
    <Select defaultValue="2024-25">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2024-25">AY 2024-25</SelectItem>
        <SelectItem value="2023-24">AY 2023-24</SelectItem>
      </SelectContent>
    </Select>
  );
}