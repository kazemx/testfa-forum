
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopicList from "@/components/TopicList";
import { useState } from "react";

const TagTopics = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tag = searchParams.get("tag");
  const [activeTab] = useState("newest");

  if (!tag) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">برچسب مورد نظر یافت نشد</h1>
            <Button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8" dir="rtl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2 hover:bg-gray-100"
              onClick={() => navigate(-1)}
            >
              <ArrowRight className="w-4 h-4" />
              <span>بازگشت</span>
            </Button>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#9b87f5]" />
              <h1 className="text-xl font-bold text-gray-900">
                مطالب مرتبط با برچسب: {tag}
              </h1>
            </div>
          </div>
        </div>

        <TopicList 
          activeTab={activeTab}
          selectedCategory={null}
          searchQuery={tag}
        />
      </div>
    </div>
  );
};

export default TagTopics;
