import { AlertTriangle, ArrowRight, MessageSquare, Send, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Reply } from "@/components/Reply";
import { Leaderboard } from "@/components/Leaderboard";
import { Topic, LeaderboardData } from "@/types/topic";
import LatestPosts from "@/components/LatestPosts";
import LatestTopics from "@/components/LatestTopics";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
const topics: Topic[] = [{
  id: 1,
  title: "چگونه می‌توانم React را یاد بگیرم؟",
  author: "علی محمدی",
  date: "2024-01-15",
  category: "آموزشی",
  content: "سلام، من می‌خوام React رو یاد بگیرم و نمی‌دونم از کجا شروع کنم. لطفاً راهنمایی کنید.",
  likes: 24,
  tags: ["React", "آموزش", "برنامه‌نویسی", "فرانت‌اند"],
  replies: [{
    id: 1,
    author: "سارا احمدی",
    content: "من پیشنهاد می‌کنم با مستندات رسمی React شروع کنید. منابع فارسی خوبی هم وجود دارد.",
    date: "2024-01-16",
    likes: 12,
    replies: [{
      id: 11,
      author: "رضا کریمی",
      content: "با نظر سارا موافقم. می‌تونید از دوره‌های آموزشی راکت هم استفاده کنید.",
      date: "2024-01-16",
      likes: 5
    }]
  }, {
    id: 2,
    author: "محمد حسینی",
    content: "پروژه‌های عملی خیلی مهم هستند. سعی کنید همزمان با یادگیری، پروژه‌های کوچک انجام بدید.",
    date: "2024-01-17",
    likes: 8,
    replies: []
  }]
}, {
  id: 2,
  title: "بهترین منابع یادگیری جاوااسکریپت",
  author: "مریم حسینی",
  date: "2024-01-14",
  category: "منابع",
  content: "پروژه‌های عملی خیلی مهم هستند. سعی کنید همزمان با یادگیری، پروژه‌های کوچک انجام بدید.",
  likes: 15,
  tags: ["جاوااسکریپت", "برنامه‌نویسی", "منابع‌آموزشی"],
  replies: [{
    id: 3,
    author: "امیر رضایی",
    content: "کتاب Eloquent JavaScript عالیه. نسخه فارسی‌ش هم موجوده.",
    date: "2024-01-15",
    likes: 6,
    replies: []
  }]
}];
const leaderboardData: LeaderboardData = {
  weekly: [{
    id: 1,
    name: "علی رضایی",
    score: 45,
    avatar: ""
  }, {
    id: 2,
    name: "مریم احمدی",
    score: 38,
    avatar: ""
  }, {
    id: 3,
    name: "رضا محمدی",
    score: 32,
    avatar: ""
  }],
  monthly: [{
    id: 1,
    name: "سارا کریمی",
    score: 156,
    avatar: ""
  }, {
    id: 2,
    name: "محمد حسینی",
    score: 142,
    avatar: ""
  }, {
    id: 3,
    name: "زهرا نوری",
    score: 128,
    avatar: ""
  }],
  allTime: [{
    id: 1,
    name: "حسین رضایی",
    score: 892,
    avatar: ""
  }, {
    id: 2,
    name: "فاطمه محمدی",
    score: 765,
    avatar: ""
  }, {
    id: 3,
    name: "علی احمدی",
    score: 643,
    avatar: ""
  }]
};
const TopicDetail = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const {
    toast
  } = useToast();
  const [response, setResponse] = useState("");
  const [reportReason, setReportReason] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const topic = topics.find(t => t.id === Number(id));
  if (!topic) {
    return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">متاسفانه موضوع مورد نظر یافت نشد</h1>
            <Button onClick={() => navigate('/')}>بازگشت به صه اصلی</Button>
          </div>
        </div>
      </div>;
  }
  const relatedTopics = topics.filter(t => t.category === topic.category && t.id !== topic.id).slice(0, 5);
  const handleSubmitResponse = () => {
    if (!response.trim()) {
      toast({
        title: "خطا",
        description: "لطفا پاسخ خود را وارد کنید",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "موفق",
      description: "پاسخ شما با موفقیت ثبت شد"
    });
    setResponse("");
  };
  const handleSubmitReport = () => {
    if (!reportReason) {
      toast({
        title: "خطا",
        description: "لطفا دلیل گزارش را انتخاب کنید",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "موفق",
      description: "گزارش شما با موفقیت ثبت شد"
    });
    setIsReportModalOpen(false);
    setReportReason("");
  };
  const handleQuickReply = () => {
    const replyElement = document.getElementById('reply-section');
    if (replyElement) {
      replyElement.scrollIntoView({
        behavior: 'smooth'
      });
      document.querySelector('textarea')?.focus();
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className={`mx-auto px-4 py-8 ${isMobile ? 'max-w-full' : 'max-w-7xl'}`} dir="rtl">
        <Button variant="ghost" className="mb-6 flex items-center gap-2 hover:bg-gray-100" onClick={() => navigate(-1)}>
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت</span>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {!isMobile && <div className="lg:col-span-3 lg:order-1">
              <div className="space-y-6 sticky top-8">
                <Leaderboard data={leaderboardData} />
                <LatestPosts />
              </div>
            </div>}

          <div className={`${isMobile ? 'col-span-1' : 'lg:col-span-6'} lg:order-2`}>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{topic?.title}</h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="ghost" size={isMobile ? "sm" : "default"} onClick={handleQuickReply} className="text-[#9b87f5] hover:text-[#7E69AB] hover:bg-purple-50">
                    پاسخ سریع
                  </Button>
                  <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size={isMobile ? "sm" : "default"} className="text-[#ea384c] hover:text-red-700 hover:bg-red-50">
                        <AlertTriangle className="w-4 h-4 ml-1" />
                        گزارش تخلف
                      </Button>
                    </DialogTrigger>
                    <DialogContent className={`${isMobile ? 'w-[95vw]' : 'sm:max-w-md'} text-right`} dir="rtl">
                      <DialogHeader>
                        <DialogTitle>گزارش این مطلب به عنوان یک</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <RadioGroup value={reportReason} onValueChange={setReportReason} className="gap-3">
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
                              نقض قوانین تست فا
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
                        <Button variant="secondary" onClick={() => setIsReportModalOpen(false)}>
                          انصراف
                        </Button>
                        <Button onClick={handleSubmitReport} className="bg-[#ea384c] hover:bg-red-600">
                          ارسال گزارش
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {topic?.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-6">
                <span>نویسنده: {topic?.author}</span>
                <span>تاریخ: {new Date(topic?.date || "").toLocaleDateString('fa-IR')}</span>
                <span>پسندیدن: {topic?.likes.toLocaleString('fa-IR')}</span>
                <span>پاسخ‌ها: {topic?.replies.length.toLocaleString('fa-IR')}</span>
              </div>

              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {topic?.content}
                </p>
                {topic?.tags && topic.tags.length > 0 && <div className="flex flex-wrap gap-2 mt-4">
                    <Tag className="w-4 h-4 text-gray-500" />
                    {topic.tags.map((tag, index) => <Badge key={index} variant="secondary" onClick={() => navigate(`/tags?tag=${encodeURIComponent(tag)}`)} className="cursor-pointer bg-sky-400 hover:bg-sky-300">
                        {tag}
                      </Badge>)}
                  </div>}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">پاسخ‌ها</h2>
              </div>
              
              <div className="space-y-4">
                {topic?.replies.map(reply => <Reply key={reply.id} reply={reply} onReply={parentId => console.log('Reply to:', parentId)} />)}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900">ارسال پاسخ جدید</h2>
              </div>
              
              <Textarea placeholder="پاسخ خود را اینجا بنویسید..." className="min-h-[150px] mb-4" value={response} onChange={e => setResponse(e.target.value)} />
              
              <Button className="flex items-center gap-2 w-full sm:w-auto" onClick={handleSubmitResponse}>
                <Send className="w-4 h-4" />
                <span>ارسال پاسخ</span>
              </Button>
            </div>
          </div>

          {isMobile ? <div className="col-span-1 space-y-6">
              <Leaderboard data={leaderboardData} />
              <LatestTopics category={topic?.category || ""} topics={relatedTopics} />
              <LatestPosts />
            </div> : <div className="lg:col-span-3 lg:order-3">
              <div className="sticky top-8">
                <LatestTopics category={topic?.category || ""} topics={relatedTopics} />
              </div>
            </div>}
        </div>
      </div>
    </div>;
};
export default TopicDetail;