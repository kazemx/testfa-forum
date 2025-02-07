
import { useState, useEffect } from "react";
import TopicTabs from "@/components/TopicTabs";
import CategoryList from "@/components/CategoryList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Popular topics data
const popularTopics = [
  {
    id: 1,
    title: "راهنمای جامع ری‌اکت",
    views: 12500,
    author: "علی حسینی"
  },
  {
    id: 2,
    title: "آموزش تیلویند از صفر تا صد",
    views: 9800,
    author: "مریم کریمی"
  },
  {
    id: 3,
    title: "برنامه‌نویسی فول‌استک",
    views: 8900,
    author: "محمد رضایی"
  },
  {
    id: 4,
    title: "امنیت در وب",
    views: 7600,
    author: "سارا محمدی"
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    // Auto-slide every second
    const interval = setInterval(() => {
      api.scrollNext();
    }, 1000);

    return () => clearInterval(interval);
  }, [api]);

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

      {/* Popular Topics Carousel Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-right">پربازدید‌ها</h2>
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {popularTopics.map((topic) => (
              <CarouselItem key={topic.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2">{topic.title}</h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{topic.author}</span>
                    <span>{topic.views.toLocaleString('fa-IR')} بازدید</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default Index;
