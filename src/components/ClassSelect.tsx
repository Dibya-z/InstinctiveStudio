import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function ClassSelect() {
  return (
    <Select defaultValue="cbse9">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Class" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="cbse9">CBSE 9</SelectItem>
        <SelectItem value="cbse10">CBSE 10</SelectItem>
      </SelectContent>
    </Select>
  );
}