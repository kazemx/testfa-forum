
import { useState } from "react";
import TopicTabs from "@/components/TopicTabs";
import CategoryList from "@/components/CategoryList";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-row-reverse gap-8">
        <div className="flex-grow">
          <TopicTabs selectedCategory={selectedCategory} />
        </div>
        <div className="hidden md:block">
          <CategoryList 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
