
import { useState } from "react";
import TopicTabs from "@/components/TopicTabs";
import CategoryList from "@/components/CategoryList";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Search Bar */}
      <div className="w-full flex justify-center py-8">
        <div className="w-3/4 relative max-w-3xl">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="جستجو در موضوعات..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 text-right"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              dir="rtl"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-row-reverse gap-8" dir="rtl">
        <div className="flex-grow">
          <TopicTabs 
            selectedCategory={selectedCategory} 
            searchQuery={searchQuery}
          />
        </div>
        <div className="hidden md:block">
          <CategoryList 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Popular Topics Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-right" dir="rtl">پربازدید‌ها</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" dir="rtl">
          {popularTopics.map((topic) => (
            <div 
              key={topic.id} 
              className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-40 border border-gray-100"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  نویسنده: {topic.author}
                </p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <div className="flex items-center gap-1 text-gray-600">
                  <svg
                    className="w-4 h-4"
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
                  <span className="text-xs font-medium">
                    {topic.views.toLocaleString('fa-IR')}
                  </span>
                </div>
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/topics/${topic.id}`)}
                  className="text-xs bg-primary/5 hover:bg-primary/10 text-primary transition-colors"
                >
                  مشاهده
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
