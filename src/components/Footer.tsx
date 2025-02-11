
import { User, BookOpen, FileText, Book, ScrollText, Copyright } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* درباره ما */}
          <div className="flex flex-col items-start space-y-4">
            <div className="flex items-center gap-2 text-primary mb-2">
              <User className="w-5 h-5" />
              <h3 className="font-bold text-lg">درباره ما</h3>
            </div>
            <p className="text-gray-600 text-sm leading-7 text-justify">
              اینجا هستیم تا با پشتوانه یک تیم جوان، متخصص و خلاق خود فارغ التحصیلان دانشگاه های برتر کشور، شما را در رسیدن به آرزوهایتان همراهی کنیم. ما مسیر موفقیت و همچنین رسیدن به جایگاه برتر را به خوبی می شناسیم. تیم ما قبل از شما بسیاری را در این مسیر همراهی کرده است. نوید ما به شما تضمین آینده است.
            </p>
          </div>

          {/* لینک‌های دسترسی */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-primary mb-6">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-lg">دسترسی آسان</h3>
            </div>
            <div className="flex flex-col items-center gap-4">
              <a href="/" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                تست فا
              </a>
              <a href="/exams" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <ScrollText className="w-4 h-4" />
                آزمون‌ها
              </a>
              <a href="/books" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <Book className="w-4 h-4" />
                کتاب‌ها
              </a>
              <a href="/rules" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                قوانین و مقررات
              </a>
            </div>
            <div className="mt-8 flex items-center gap-1.5 text-gray-500 text-sm">
              <Copyright className="w-4 h-4" />
              <span>تمامی حقوق برای تست فا محفوظ است</span>
            </div>
          </div>

          {/* نمادها */}
          <div className="flex flex-col items-center gap-4">
            <img
              src="/lovable-uploads/12bfdee4-963e-4d18-b4b3-6e87345a6442.png"
              alt="نماد اعتماد الکترونیکی"
              className="w-24 h-24 object-contain"
            />
            <img
              src="/lovable-uploads/12bfdee4-963e-4d18-b4b3-6e87345a6442.png"
              alt="نماد ساماندهی"
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
