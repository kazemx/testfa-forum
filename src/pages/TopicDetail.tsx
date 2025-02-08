
import { AlertTriangle, ArrowRight, MessageCircle, MessageSquare, Send, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Define types for better type safety
type Reply = {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Reply[];
};

type Topic = {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  replies: Reply[];
};

// Define topics array with nested replies
const topics: Topic[] = [
  {
    id: 1,
    title: "چگونه می‌توانم React را یاد بگیرم؟",
    author: "علی محمدی",
    date: "2024-01-15",
    category: "آموزشی",
    likes: 24,
    replies: [
      {
        id: 1,
        author: "سارا احمدی",
        content: "من پیشنهاد می‌کنم با مستندات رسمی React شروع کنید. منابع فارسی خوبی هم وجود دارد.",
        date: "2024-01-16",
        likes: 12,
        replies: [
          {
            id: 11,
            author: "رضا کریمی",
            content: "با نظر سارا موافقم. می‌تونید از دوره‌های آموزشی راکت هم استفاده کنید.",
            date: "2024-01-16",
            likes: 5
          }
        ]
      },
      {
        id: 2,
        author: "محمد حسینی",
        content: "پروژه‌های عملی خیلی مهم هستند. سعی کنید همزمان با یادگیری، پروژه‌های کوچک انجام بدید.",
        date: "2024-01-17",
        likes: 8,
        replies: []
      }
    ]
  },
  {
    id: 2,
    title: "بهترین منابع یادگیری جاوااسکریپت",
    author: "مریم حسینی",
    date: "2024-01-14",
    category: "منابع",
    likes: 15,
    replies: [
      {
        id: 3,
        author: "امیر رضایی",
        content: "کتاب Eloquent JavaScript عالیه. نسخه فارسی‌ش هم موجوده.",
        date: "2024-01-15",
        likes: 6,
        replies: []
      }
    ]
  }
];

// Reply component to show individual replies
const ReplyComponent = ({ reply, onReply }: { reply: Reply; onReply: (parentId: number) => void }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { toast } = useToast();

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
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
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <div className="border-r border-gray-200 pr-4 mb-4">
      <div className="bg-gray-50 rounded-lg p-4 mb-2">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium text-gray-900">{reply.author}</div>
          <div className="text-sm text-gray-500">{new Date(reply.date).toLocaleDateString('fa-IR')}</div>
        </div>
        <p className="text-gray-700 mb-2">{reply.content}</p>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <ThumbsUp className="w-4 h-4" />
            <span>{reply.likes}</span>
          </button>
          <button 
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <MessageCircle className="w-4 h-4" />
            <span>پاسخ</span>
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2 mb-4">
          <Textarea
            placeholder="پاسخ خود را بنویسید..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmitReply}>ارسال پاسخ</Button>
            <Button variant="outline" onClick={() => setShowReplyForm(false)}>انصراف</Button>
          </div>
        </div>
      )}

      {reply.replies && reply.replies.length > 0 && (
        <div className="mr-4">
          {reply.replies.map((nestedReply) => (
            <ReplyComponent key={nestedReply.id} reply={nestedReply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};

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
            <span>پاسخ‌ها: {topic.replies.length.toLocaleString('fa-IR')}</span>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              این یک متن نمونه برای نمایش محتوای تاپیک است. در نسخه نهایی، محتوای واقعی تاپیک در این قسمت نمایش داده خواهد شد.
            </p>
          </div>
        </div>

        {/* Replies Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">پاسخ‌ها</h2>
          </div>
          
          <div className="space-y-4">
            {topic.replies.map((reply) => (
              <ReplyComponent 
                key={reply.id} 
                reply={reply}
                onReply={(parentId) => console.log('Reply to:', parentId)}
              />
            ))}
          </div>
        </div>

        {/* New Response Section */}
        <div id="reply-section" className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-gray-900">ارسال پاسخ جدید</h2>
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
