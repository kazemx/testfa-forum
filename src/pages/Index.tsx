
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

    // Auto-slide every 0.5 seconds
    const interval = setInterval(() => {
      api.scrollNext();
    }, 500);

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
                <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-40">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">
                      نویسنده: {topic.author}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-xs font-medium text-gray-700">
                        {topic.views.toLocaleString('fa-IR')}
                      </span>
                    </div>
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

