
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Grid2X2, List } from "lucide-react";

interface ProductFiltersProps {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function ProductFilters({
  view,
  setView,
  sortBy,
  setSortBy,
}: ProductFiltersProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2 border rounded-lg p-1">
        <Button
          variant={view === "grid" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setView("grid")}
        >
          <Grid2X2 className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "list" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => setView("list")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">Name (A-Z)</SelectItem>
          <SelectItem value="name-desc">Name (Z-A)</SelectItem>
          <SelectItem value="price-asc">Price (Low to High)</SelectItem>
          <SelectItem value="price-desc">Price (High to Low)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
