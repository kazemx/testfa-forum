
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, FileText, Video, Image, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

type Topic = {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  replies: number;
  category: string;
};

const getTopicIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "برنامه‌نویسی":
      return <FileText className="w-4 h-4 text-gray-600" />;
    case "طراحی":
      return <Image className="w-4 h-4 text-gray-600" />;
    case "هوش مصنوعی":
      return <BookOpen className="w-4 h-4 text-gray-600" />;
    case "موبایل":
      return <Video className="w-4 h-4 text-gray-600" />;
    default:
      return <FolderOpen className="w-4 h-4 text-gray-600" />;
  }
};

const topics: Topic[] = [
  {
    id: 1,
    title: "شروع برنامه‌نویسی وب",
    author: "سارا چن",
    date: "2024-03-20",
    likes: 245,
    replies: 89,
    category: "برنامه‌نویسی"
  },
  {
    id: 2,
    title: "تکنیک‌های مدرن جاوااسکریپت",
    author: "علی کیم",
    date: "2024-03-19", 
    likes: 189,
    replies: 156,
    category: "برنامه‌نویسی"
  },
  {
    id: 3,
    title: "اصول طراحی رابط کاربری",
    author: "مریم گارسیا",
    date: "2024-03-18",
    likes: 312,
    replies: 67,
    category: "طراحی"
  },
  {
    id: 4,
    title: "مبانی یادگیری ماشین",
    author: "جان اسمیت", 
    date: "2024-03-17",
    likes: 178,
    replies: 45,
    category: "هوش مصنوعی"
  },
  {
    id: 5,
    title: "بهترین روش‌های امنیت شبکه",
    author: "امیلی براون",
    date: "2024-03-16",
    likes: 156,
    replies: 34,
    category: "امنیت"
  },
  {
    id: 6,
    title: "آموزش پایتون پیشرفته",
    author: "رضا احمدی",
    date: "2024-03-15",
    likes: 234,
    replies: 78,
    category: "برنامه‌نویسی"
  },
  {
    id: 7,
    title: "مدیریت پروژه‌های نرم‌افزاری",
    author: "سحر محمدی",
    date: "2024-03-14",
    likes: 167,
    replies: 43,
    category: "مدیریت"
  },
  {
    id: 8,
    title: "کار با پایگاه‌داده NoSQL",
    author: "علی رضایی",
    date: "2024-03-13",
    likes: 198,
    replies: 56,
    category: "پایگاه‌داده"
  },
  {
    id: 9,
    title: "برنامه‌نویسی موبایل",
    author: "نیما کریمی",
    date: "2024-03-12",
    likes: 221,
    replies: 67,
    category: "موبایل"
  },
  {
    id: 10,
    title: "طراحی تجربه کاربری",
    author: "مینا حسینی",
    date: "2024-03-11",
    likes: 278,
    replies: 89,
    category: "طراحی"
  },
  {
    id: 11,
    title: "امنیت در اپلیکیشن‌های وب",
    author: "کامران علوی",
    date: "2024-03-10",
    likes: 189,
    replies: 45,
    category: "امنیت"
  },
  {
    id: 12,
    title: "توسعه بک‌اند با Node.js",
    author: "زهرا تقوی",
    date: "2024-03-09",
    likes: 234,
    replies: 78,
    category: "برنامه‌نویسی"
  }
];

const sortTopics = (topics: Topic[], activeTab: string, selectedCategory: string | null) => {
  let filteredTopics = selectedCategory 
    ? topics.filter(topic => topic.category === selectedCategory)
    : topics;

  const sortedTopics = [...filteredTopics];
  switch (activeTab) {
    case "most-liked":
      return sortedTopics.sort((a, b) => b.likes - a.likes);
    case "most-replied":
      return sortedTopics.sort((a, b) => b.replies - a.replies);
    default:
      return sortedTopics.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }
};

export default function TopicList({ 
  activeTab, 
  selectedCategory 
}: { 
  activeTab: string;
  selectedCategory: string | null;
}) {
  const sortedTopics = sortTopics(topics, activeTab, selectedCategory);
  const navigate = useNavigate();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${activeTab}-${selectedCategory}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        dir="rtl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedTopics.map((topic) => (
            <motion.div
              key={topic.id}
              layout
              className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-40"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getTopicIcon(topic.category)}
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {topic.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  نویسنده: {topic.author}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(topic.date).toLocaleDateString('fa-IR')}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">
                      {topic.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">
                      {topic.replies}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/topics/${topic.id}`)}
                  className="text-xs"
                >
                  مشاهده
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
