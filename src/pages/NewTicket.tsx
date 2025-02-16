import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const NewTicket = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // در اینجا می‌توانید اطلاعات تیکت را به سرور ارسال کنید
    console.log({
      title,
      category,
      message
    });
    toast({
      title: "تیکت با موفقیت ثبت شد",
      description: "به زودی پاسخ تیکت شما ارسال خواهد شد."
    });
    navigate("/profile");
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6" dir="rtl">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" onClick={() => navigate("/profile")} className="ml-4">
              <ArrowRight className="h-4 w-4 ml-2" />
              بازگشت
            </Button>
            <h1 className="text-2xl font-bold">ثبت تیکت جدید</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                عنوان تیکت
              </label>
              <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="عنوان تیکت را وارد کنید" required />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                موضوع
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="موضوع تیکت را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">مشکلات فنی</SelectItem>
                  <SelectItem value="account">حساب کاربری</SelectItem>
                  <SelectItem value="billing">مسائل مالی</SelectItem>
                  <SelectItem value="other">سایر موارد</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                متن پیام
              </label>
              <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="متن پیام خود را وارد کنید" className="h-40" required />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-500">
              ثبت تیکت
            </Button>
          </form>
        </div>
      </div>
    </div>;
};
export default NewTicket;