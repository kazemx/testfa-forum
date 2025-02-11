
import { useState } from "react";
import TopicTabs from "@/components/TopicTabs";
import CategoryList from "@/components/CategoryList";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, Plus, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MobileCategoryFilter from "@/components/MobileCategoryFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import LoginButton from "@/components/LoginButton";

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

// Popular tags data
const popularTags = [
  { id: 1, name: "آموزش", count: 6 },
  { id: 2, name: "ریاضی", count: 5 },
  { id: 3, name: "برنامه نویسی", count: 5 },
  { id: 4, name: "علوم", count: 3 },
  { id: 5, name: "فیزیک", count: 2 },
  { id: 6, name: "شیمی", count: 2 }
];
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleTagClick = (tagName: string) => {
    navigate(`/tags?tag=${encodeURIComponent(tagName)}`);
  };

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
                  className="bg-[#f0ed1a] hover:bg-[#f0ed1a]/90 text-gray-800 rounded-xl flex items-center gap-2 px-6"
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

            {/* Popular Topics Section */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6 text-right">پربازدید‌ها</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {!isMobile && (
            <div className="hidden md:block space-y-4">
              <CategoryList 
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              
              {/* Popular Tags Section - Moved here */}
              <div className="bg-white/50 backdrop-blur-sm rounded-none p-4 shadow-md border border-gray-100 w-64">
                <div className="flex items-center gap-2 mb-4">
                  <Tags className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-bold">تگ‌های پرطرفدار</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleTagClick(tag.name)}
                      className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{tag.name}</span>
                      <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md text-xs group-hover:bg-primary/20 transition-colors">
                        {tag.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <MobileCategoryFilter 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Footer />
    </div>
  );
};

export default Index;
