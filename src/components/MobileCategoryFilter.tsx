
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CategoryList from "./CategoryList";
import { useIsMobile } from "@/hooks/use-mobile";

interface MobileCategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const MobileCategoryFilter = ({ selectedCategory, onSelectCategory }: MobileCategoryFilterProps) => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed bottom-6 left-6 bg-primary text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50">
          <Filter className="w-4 h-4" />
          <span>دسته‌بندی</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <CategoryList
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            onSelectCategory(category);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileCategoryFilter;
