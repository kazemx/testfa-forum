
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { categories } from "@/components/CategoryList";
import { Tag, Home } from "lucide-react";

const NewQuestion = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "پرسش شما بعد از تایید مدیر در سایت قابل مشاهده است",
      className: "fixed top-4 left-4 right-auto",
      duration: 3000,
    });

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (tags.length >= 5) {
        toast({
          title: "حداکثر ۵ برچسب می‌توانید اضافه کنید",
          variant: "destructive",
          className: "fixed top-4 left-4 right-auto",
        });
        return;
      }
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg" dir="rtl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">ثبت پرسش جدید</h1>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              بازگشت به خانه
            </Button>
          </div>
          
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                برچسب‌ها (حداکثر ۵ مورد)
              </label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="برچسب را وارد کنید و Enter را بزنید"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="text-right"
                    disabled={tags.length >= 5}
                  />
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

