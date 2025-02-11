
import { ArrowRight, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  content: string;
  sender: "user" | "admin";
  date: string;
}

const TicketDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState("");
  
  // این داده‌ها باید از سرور دریافت شوند
  const [ticket] = useState({
    id,
    title: "مشکل در ورود به حساب کاربری",
    status: "در حال بررسی",
    category: "مشکلات فنی",
    messages: [
      {
        id: 1,
        content: "سلام، من نمیتونم وارد حساب کاربریم بشم. پیغام خطا میده.",
        sender: "user",
        date: "۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰"
      },
      {
        id: 2,
        content: "سلام، لطفاً بفرمایید دقیقاً چه پیغام خطایی دریافت می‌کنید؟",
        sender: "admin",
        date: "۱۴۰۲/۱۲/۱۵ - ۱۵:۰۰"
      }
    ] as Message[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // در اینجا پیام جدید به سرور ارسال می‌شود
    console.log({ ticketId: id, message: newMessage });
    
    toast({
      title: "پیام شما با موفقیت ارسال شد",
      description: "به زودی پاسخ پیام شما ارسال خواهد شد."
    });
    
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6" dir="rtl">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate("/profile")}
                className="ml-4"
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                بازگشت
              </Button>
              <h1 className="text-2xl font-bold">{ticket.title}</h1>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">وضعیت:</span>
              <span className="font-medium text-primary">{ticket.status}</span>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            {ticket.messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col p-4 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary/10 ml-12"
                    : "bg-muted mr-12"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">
                    {message.sender === "user" ? "شما" : "پشتیبانی"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {message.date}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="h-32"
              required
            />
            <Button type="submit" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              ارسال پیام
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
