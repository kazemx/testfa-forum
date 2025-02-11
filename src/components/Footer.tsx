
import { User, BookOpen, FileText, Book, ScrollText, Copyright } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-100 py-8 sm:py-12 mt-8 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* درباره ما */}
          <div className="flex flex-col items-start space-y-4 order-3 sm:order-1">
            <div className="flex items-center gap-2 text-primary mb-2">
              <User className="w-5 h-5" />
              <h3 className="font-bold text-lg">درباره ما</h3>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-7 text-justify">
              اینجا هستیم تا با پشتوانه یک تیم جوان، متخصص و خلاق خود فارغ التحصیلان دانشگاه های برتر کشور، شما را در رسیدن به آرزوهایتان همراهی کنیم. ما مسیر موفقیت و همچنین رسیدن به جایگاه برتر را به خوبی می شناسیم. تیم ما قبل از شما بسیاری را در این مسیر همراهی کرده است. نوید ما به شما تضمین آینده است.
            </p>
          </div>

          {/* لینک‌های دسترسی */}
          <div className="flex flex-col items-center order-1 sm:order-2">
            <div className="flex items-center gap-2 text-primary mb-4 sm:mb-6">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold text-lg">دسترسی آسان</h3>
            </div>
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <a href="/" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm sm:text-base">
                <FileText className="w-4 h-4" />
                تست فا
              </a>
              <a href="/exams" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm sm:text-base">
                <ScrollText className="w-4 h-4" />
                آزمون‌ها
              </a>
              <a href="/books" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm sm:text-base">
                <Book className="w-4 h-4" />
                کتاب‌ها
              </a>
              <a href="/rules" className="text-gray-600 hover:text-primary transition-colors flex items-center gap-2 text-sm sm:text-base">
                <FileText className="w-4 h-4" />
                قوانین و مقررات
              </a>
            </div>
            <div className="mt-6 sm:mt-8 flex items-center gap-1.5 text-gray-500 text-sm sm:text-base">
              <Copyright className="w-4 h-4" />
              <span>تمامی حقوق برای تست فا محفوظ است</span>
            </div>
          </div>

          {/* نمادها */}
          <div className="flex flex-row sm:flex-col items-center justify-center gap-4 order-2 sm:order-3">
            <img
              src="/lovable-uploads/12bfdee4-963e-4d18-b4b3-6e87345a6442.png"
              alt="نماد اعتماد الکترونیکی"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
            <img
              src="/lovable-uploads/12bfdee4-963e-4d18-b4b3-6e87345a6442.png"
              alt="نماد ساماندهی"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
