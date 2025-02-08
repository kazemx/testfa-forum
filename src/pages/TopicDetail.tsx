
import { AlertTriangle, ArrowRight, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Import the topics array directly
const topics = [
  {
    id: 1,
    title: "چگونه می‌توانم React را یاد بگیرم؟",
    author: "علی محمدی",
    date: "2024-01-15",
    category: "آموزشی",
    likes: 24,
    replies: 8
  },
  {
    id: 2,
    title: "بهترین منابع یادگیری جاوااسکریپت",
    author: "مریم حسینی",
    date: "2024-01-14", 
    category: "منابع",
    likes: 15,
    replies: 5
  }
];

const TopicDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [response, setResponse] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
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

  const handleSubmitReport = () => {
    if (!reportReason) {
      toast({
        title: "خطا",
        description: "لطفا دلیل گزارش را انتخاب کنید",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "موفق",
      description: "گزارش شما با موفقیت ثبت شد",
    });
    setIsReportModalOpen(false);
    setReportReason("");
  };

  const handleQuickReply = () => {
    const replyElement = document.getElementById('reply-section');
    if (replyElement) {
      replyElement.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('textarea')?.focus();
    }
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
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleQuickReply}
                className="text-[#9b87f5] hover:text-[#7E69AB] hover:bg-purple-50"
              >
                پاسخ سریع
              </Button>
              <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-[#ea384c] hover:text-red-700 hover:bg-red-50"
                  >
                    <AlertTriangle className="w-4 h-4 ml-1" />
                    گزارش تخلف
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" dir="rtl">
                  <DialogHeader>
                    <DialogTitle>گزارش این مطلب به عنوان یک</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <RadioGroup 
                      value={reportReason} 
                      onValueChange={setReportReason}
                      className="gap-3"
                    >
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="spam" id="spam" />
                        <label htmlFor="spam" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          اسپم
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="duplicate" id="duplicate" />
                        <label htmlFor="duplicate" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          نوشته تکراری
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="violation" id="violation" />
                        <label htmlFor="violation" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          نقض قوانین راکت
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RadioGroupItem value="other" id="other" />
                        <label htmlFor="other" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          موارد دیگر
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="flex justify-end gap-3 mt-4">
                    <Button
                      variant="secondary"
                      onClick={() => setIsReportModalOpen(false)}
                    >
                      انصراف
                    </Button>
                    <Button
                      onClick={handleSubmitReport}
                      className="bg-[#ea384c] hover:bg-red-600"
                    >
                      ارسال گزارش
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {topic.category}
              </span>
            </div>
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
        <div id="reply-section" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
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
