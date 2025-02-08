
import { ArrowRight, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { topics } from "@/components/TopicList";

const TopicDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [response, setResponse] = useState("");
  
  // Find the topic from our mock data
  const topic = topics.find(t => t.id === Number(id));

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">موضوع مورد نظر یافت نشد</h1>
            <Button onClick={() => navigate('/')}>بازگشت به صفحه اصلی</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmitResponse = () => {
    if (!response.trim()) {
      toast({
        title: "خطا",
        description: "لطفا پاسخ خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "موفق",
      description: "پاسخ شما با موفقیت ثبت شد",
    });
    setResponse("");
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

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {topic.category}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span>نویسنده: {topic.author}</span>
            <span>تاریخ: {new Date(topic.date).toLocaleDateString('fa-IR')}</span>
            <span>پسندیدن: {topic.likes.toLocaleString('fa-IR')}</span>
            <span>پاسخ‌ها: {topic.replies.toLocaleString('fa-IR')}</span>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              این یک متن نمونه برای نمایش محتوای تاپیک است. در نسخه نهایی، محتوای واقعی تاپیک در این قسمت نمایش داده خواهد شد.
            </p>
          </div>
        </div>

        {/* Response Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">ارسال پاسخ</h2>
          </div>
          
          <Textarea
            placeholder="پاسخ خود را اینجا بنویسید..."
            className="min-h-[150px] mb-4"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
          
          <Button 
            className="flex items-center gap-2"
            onClick={handleSubmitResponse}
          >
            <Send className="w-4 h-4" />
            <span>ارسال پاسخ</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
