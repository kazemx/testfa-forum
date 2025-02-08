
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TopicDetail = () => {
  const navigate = useNavigate();

  // Mock data for the topic
  const topic = {
    id: 1,
    title: "راهنمای جامع ری‌اکت",
    content: "در این راهنما به بررسی کامل ری‌اکت می‌پردازیم...",
    author: "علی حسینی",
    date: "۱۴۰۲/۱۲/۱۵",
    category: "برنامه‌نویسی",
    views: 12500
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
        <Button
          variant="ghost"
          className="mb-6 flex items-center gap-2 hover:bg-gray-100"
          onClick={() => navigate(-1)}
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت</span>
        </Button>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {topic.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span>نویسنده: {topic.author}</span>
            <span>تاریخ: {topic.date}</span>
            <span>بازدید: {topic.views.toLocaleString('fa-IR')}</span>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">{topic.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
