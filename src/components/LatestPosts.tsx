
import { BookOpen } from "lucide-react";

const latestPosts = [
  {
    id: 1,
    title: "آزمون آنلاین دین و زندگی دوازدهم| مشترک همه رشته ها",
    category: "دوازدهم"
  },
  {
    id: 2,
    title: "آزمون آنلاین ریاضی پایه دوازهم | رشته تجربی",
    category: "دوازدهم"
  },
  {
    id: 3,
    title: "آزمون جامع زیست شناسی کنکور تجربی",
    category: "کنکور"
  },
  {
    id: 4,
    title: "آزمون آنلاین هوش و استعداد معلمی | ویژه فرهنگیان",
    category: "استخدامی"
  },
  {
    id: 5,
    title: "آزمون آنلاین زیست شناسی دهم تجربی فصل دوم | گفتار 2: جذب مواد و تنظیم فعالیت دستگاه گوارش",
    category: "دهم"
  }
];

const LatestPosts = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-gray-900">آخرین آزمون‌های منتشر شده</h2>
      </div>
      <div className="space-y-3">
        {latestPosts.map((post) => (
          <div 
            key={post.id}
            className="p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-2">
              <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md whitespace-nowrap mt-0.5">
                {post.category}
              </span>
              <h3 className="text-sm text-gray-700 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
