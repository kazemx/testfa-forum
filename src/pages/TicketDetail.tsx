import { ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
interface Message {
  id: number;
  content: string;
  sender: "user" | "admin";
  date: string;
}
const TicketDetail = () => {
  const navigate = useNavigate();
  const {
    id
  } = useParams();
  const {
    toast
  } = useToast();
  const isMobile = useIsMobile();
  const [newMessage, setNewMessage] = useState("");

  // این داده‌ها باید از سرور دریافت شوند
  const [ticket] = useState({
    id,
    title: "مشکل در ورود به حساب کاربری",
    status: "در حال بررسی",
    category: "مشکلات فنی",
    messages: [{
      id: 1,
      content: "سلام، من نمیتونم وارد حساب کاربریم بشم. پیغام خطا میده.",
      sender: "user",
      date: "۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰"
    }, {
      id: 2,
      content: "سلام، لطفاً بفرمایید دقیقاً چه پیغام خطایی دریافت می‌کنید؟",
      sender: "admin",
      date: "۱۴۰۲/۱۲/۱۵ - ۱۵:۰۰"
    }] as Message[]
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // در اینجا پیام جدید به سرور ارسال می‌شود
    console.log({
      ticketId: id,
      message: newMessage
    });
    toast({
      title: "پیام شما با موفقیت ارسال شد",
      description: "به زودی پاسخ پیام شما ارسال خواهد شد."
    });
    setNewMessage("");
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6" dir="rtl">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate("/profile")} className="ml-2 sm:ml-4 hover:text-[#9293f9] hover:bg-[#9293f9]/10" size={isMobile ? "sm" : "default"}>
                <ArrowRight className="h-4 w-4 ml-1 sm:ml-2" />
                بازگشت
              </Button>
              <h1 className="text-lg sm:text-2xl font-bold line-clamp-1">
                {ticket.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm mr-2 sm:mr-0">
              <span className="text-muted-foreground whitespace-nowrap">وضعیت:</span>
              <span className="font-medium text-[#9293f9] whitespace-nowrap">
                {ticket.status}
              </span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6 mb-4 sm:mb-8">
            {ticket.messages.map(message => <div key={message.id} className={`flex flex-col p-3 sm:p-4 rounded-lg ${message.sender === "user" ? "bg-[#9293f9]/10 ml-4 sm:ml-12" : "bg-[#f0ed1a]/10 mr-4 sm:mr-12"}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm sm:text-base">
                    {message.sender === "user" ? "شما" : "پشتیبانی"}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {message.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm whitespace-pre-line break-words">
                  {message.content}
                </p>
              </div>)}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <Textarea value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="پیام خود را بنویسید..." className="h-24 sm:h-32 text-sm sm:text-base focus-visible:ring-[#9293f9]" required />
            <div className="flex justify-end">
              <Button type="submit" size={isMobile ? "sm" : "default"} className="flex items-center gap-1 sm:gap-2 bg-green-600 hover:bg-green-500">
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                ارسال پیام
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>;
};
export default TicketDetail;