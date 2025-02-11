
import { useState, useEffect } from "react";
import TopicTabs from "@/components/TopicTabs";
import CategoryList from "@/components/CategoryList";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileCategoryFilter from "@/components/MobileCategoryFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import LoginButton from "@/components/LoginButton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

// Popular topics data
const popularTopics = [
  {
    id: 1,
    title: "مبانی ریاضیات گسسته",
    views: 15200,
    author: "دکتر علی محمدی",
    category: "ریاضی"
  },
  {
    id: 2,
    title: "فلسفه علم و معرفت‌شناسی",
    views: 14300,
    author: "دکتر حسین کریمی",
    category: "فلسفه"
  },
  {
    id: 3,
    title: "اصول اقتصاد خرد",
    views: 13800,
    author: "دکتر مریم رضایی",
    category: "اقتصاد"
  },
  {
    id: 4,
    title: "قواعد صرف و نحو عربی",
    views: 12900,
    author: "استاد احمد عباسی",
    category: "عربی"
  },
  {
    id: 5,
    title: "نظریه اعداد در ریاضیات",
    views: 12500,
    author: "دکتر رضا صادقی",
    category: "ریاضی"
  },
  {
    id: 6,
    title: "فلسفه هنر و زیبایی‌شناسی",
    views: 11800,
    author: "دکتر زهرا حسینی",
    category: "فلسفه"
  },
  {
    id: 7,
    title: "بازارهای مالی و سرمایه‌گذاری",
    views: 11200,
    author: "دکتر امیر محمودی",
    category: "اقتصاد"
  },
  {
    id: 8,
    title: "بلاغت در زبان عربی",
    views: 10900,
    author: "استاد محمد کاظمی",
    category: "عربی"
  },
  {
    id: 9,
    title: "آنالیز ریاضی پیشرفته",
    views: 10500,
    author: "دکتر سارا نوری",
    category: "ریاضی"
  },
  {
    id: 10,
    title: "فلسفه ذهن و روان",
    views: 10100,
    author: "دکتر علیرضا محسنی",
    category: "فلسفه"
  }
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % popularTopics.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        {/* Logo, Title and Login Button */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex flex-col items-start">
            <img 
              src="/lovable-uploads/12bfdee4-963e-4d18-b4b3-6e87345a6442.png" 
              alt="تالار گفتگو" 
              className="w-16 h-16 mb-2"
            />
            <h1 className="text-lg font-semibold text-gray-800">تالار گفتگوی تست فا</h1>
          </div>
          <LoginButton />
        </div>

        <div className="flex flex-row-reverse gap-8">
          <div className="flex-grow">
            {/* Search Bar */}
            <div className="w-full flex justify-end mb-8">
              <div className="w-full relative flex gap-4">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 px-6"
                  onClick={() => navigate('/new-question')}
                >
                  <Plus className="w-5 h-5" />
                  <span>ثبت پرسش جدید</span>
                </Button>
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="جست و جو در عناوین ..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 text-right"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            <TopicTabs 
              selectedCategory={selectedCategory} 
              searchQuery={searchQuery}
            />

            {/* Popular Topics Carousel Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-right">پربازدیدها</h2>
              <Carousel className="w-full overflow-hidden">
                <CarouselContent>
                  {popularTopics.map((topic, index) => (
                    <CarouselItem key={topic.id} className="basis-full">
                      <div 
                        className={`bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md border border-gray-100 transition-all duration-500 ${
                          index === activeSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full absolute"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
                          <h3 className="text-lg font-semibold text-gray-900">
                            {topic.title}
                          </h3>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-gray-600">
                            نویسنده: {topic.author}
                          </p>
                          <p className="text-sm text-gray-600">
                            دسته‌بندی: {topic.category}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2 text-gray-600">
                              <svg
                                className="w-5 h-5"
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
                              <span className="text-sm font-medium">
                                {topic.views.toLocaleString('fa-IR')}
                              </span>
                            </div>
                            <Button 
                              variant="secondary"
                              size="sm"
                              onClick={() => navigate(`/topics/${topic.id}`)}
                              className="text-sm bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
                            >
                              مشاهده
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
          {!isMobile && (
            <div className="hidden md:block">
              <CategoryList 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          )}
        </div>
      </div>

      <MobileCategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
};

export default Index;
