
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { categories } from "@/components/CategoryList";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    
    toast({
      title: "پرسش شما بعد از تایید مدیر در سایت قابل مشاهده است",
      className: "fixed top-4 left-4 right-auto",
      duration: 3000,
    });

    // Redirect to home page after submission
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg" dir="rtl">
          <h1 className="text-2xl font-bold mb-8 text-gray-800">ثبت پرسش جدید</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان گفتگو
              </label>
              <Input
                placeholder="عنوان را وارد کنید"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-right"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته بندی گفتگو
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="w-full text-right">
                  <SelectValue placeholder="دسته بندی مورد نظر را انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      <div className="flex items-center gap-2">
                        {cat.icon}
                        <span>{cat.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                متن گفتگو
              </label>
              <Textarea
                placeholder="متن مورد نظر خود را وارد کنید..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[200px] text-right"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3"
            >
              ثبت پرسش
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewQuestion;
