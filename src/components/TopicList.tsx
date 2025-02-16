import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, FlaskConical, ChartLine, Signal, Shield, Microscope, Earth, Users, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
type Topic = {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  replies: number;
  category: string;
  tags?: string[];
  content?: string;
};
const getTopicIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "ریاضیات":
      return <ChartLine className="w-4 h-4 text-gray-600 bg-teal-300 hover:bg-teal-200 rounded-2xl" />;
    case "زیست شناسی":
      return <Microscope className="w-4 h-4 text-gray-600 bg-green-400 hover:bg-green-300 rounded-lg" />;
    case "شیمی":
      return <FlaskConical className="w-4 h-4 text-gray-600 bg-rose-700 hover:bg-rose-600 rounded-lg" />;
    case "فیزیک":
      return <Signal className="w-4 h-4 text-gray-600 bg-lime-200 hover:bg-lime-100 rounded-lg" />;
    case "علوم و فنون":
      return <Shield className="w-4 h-4 text-gray-600 bg-sky-400 hover:bg-sky-300 rounded-lg" />;
    case "زمین شناسی":
    case "جغرافیا":
      return <Earth className="w-4 h-4 text-gray-600 bg-lime-600 hover:bg-lime-500 rounded-lg" />;
    case "جامعه شناسی":
      return <Users className="w-4 h-4 text-gray-600 bg-emerald-100" />;
    case "ادبیات فارسی":
    case "عربی":
    case "زبان انگلیسی":
      return <BookOpen className="w-4 h-4 text-gray-600" />;
    default:
      return <Book className="w-4 h-4 text-gray-600" />;
  }
};
const topics: Topic[] = [{
  id: 1,
  title: "مفاهیم پایه‌ای ریاضیات",
  author: "سارا چن",
  date: "2024-03-20",
  likes: 245,
  replies: 89,
  category: "ریاضیات",
  tags: ["آموزش", "ریاضی"],
  content: "در این مقاله به بررسی مفاهیم پایه‌ای ریاضیات می‌پردازیم. مواردی همچون اعداد حقیقی، معادلات درجه اول و دوم، توابع و مشتق‌گیری مقدماتی را بررسی خواهیم کرد. این مفاهیم پایه برای درک عمیق‌تر ریاضیات پیشرفته ضروری هستند."
}, {
  id: 2,
  title: "سیستم‌های زیستی",
  author: "علی کیم",
  date: "2024-03-19",
  likes: 189,
  replies: 156,
  category: "زیست شناسی",
  tags: ["آموزش"],
  content: "در این مطلب با سیستم‌های مختلف بدن انسان آشنا می‌شویم. از سیستم گردش خون گرفته تا سیستم عصبی و گوارش، همه را به زبانی ساده بررسی خواهیم کرد. همچنین به تعامل این سیستم‌ها با یکدیگر نیز خواهیم پرداخت."
}, {
  id: 3,
  title: "واکنش‌های شیمیایی",
  author: "مریم گارسیا",
  date: "2024-03-18",
  likes: 312,
  replies: 67,
  category: "شیمی",
  tags: ["آموزش"],
  content: "در این درس، انواع مختلف واکنش‌های شیمیایی را بررسی می‌کنیم. از واکنش‌های اکسیداسیون-احیا گرفته تا واکنش‌های اسید-باز، همه را با مثال‌های کاربردی توضیح خواهیم داد. همچنین به موازنه معادلات شیمیایی نیز خواهیم پرداخت."
}, {
  id: 4,
  title: "قوانین نیوتن",
  author: "جان اسمیت",
  date: "2024-03-17",
  likes: 178,
  replies: 45,
  category: "فیزیک",
  tags: ["آموزش"],
  content: "در این مقاله، سه قانون اصلی نیوتن در مورد حرکت را بررسی می‌کنیم. از قانون اول (اینرسی) تا قانون سوم (عمل و عکس‌العمل)، همه را با مثال‌های روزمره توضیح خواهیم داد. کاربردهای این قوانین در زندگی روزمره نیز بررسی خواهد شد."
}, {
  id: 5,
  title: "اصول علوم و فنون",
  author: "امیلی براون",
  date: "2024-03-16",
  likes: 156,
  replies: 34,
  category: "علوم و فنون",
  tags: ["آموزش"],
  content: "در این درس به مبانی علوم و فنون می‌پردازیم. از روش‌های علمی گرفته تا کاربرد فناوری در زندگی روزمره، همه را بررسی خواهیم کرد. همچنین به تاثیر پیشرفت‌های علمی بر جامعه نیز نگاهی خواهیم انداخت."
}, {
  id: 6,
  title: "زمین‌شناسی عمومی",
  author: "رضا احمدی",
  date: "2024-03-15",
  likes: 234,
  replies: 78,
  category: "زمین شناسی",
  tags: ["آموزش"],
  content: "در این مطلب با ساختار زمین، انواع سنگ‌ها، و فرآیندهای زمین‌شناختی آشنا می‌شویم. از فرآیندهای آتشفشانی تا فرسایش و رسوب‌گذاری، همه را به زبانی ساده توضیح خواهیم داد."
}, {
  id: 7,
  title: "جامعه‌شناسی مدرن",
  author: "سحر محمدی",
  date: "2024-03-14",
  likes: 167,
  replies: 43,
  category: "جامعه شناسی",
  tags: ["برنامه نویسی"],
  content: "در این مقاله به بررسی مفاهیم اساسی جامعه‌شناسی مدرن می‌پردازیم. از نظریه‌های اجتماعی گرفته تا تحلیل رفتارهای جمعی، همه را مورد بررسی قرار خواهیم داد."
}, {
  id: 8,
  title: "مشتق و کاربردهای آن",
  author: "علی رضایی",
  date: "2024-03-13",
  likes: 198,
  replies: 56,
  category: "ریاضیات",
  tags: ["ریاضی"],
  content: "در این درس، مفهوم مشتق و کاربردهای آن در حل مسائل واقعی را بررسی می‌کنیم. از محاسبه نرخ تغییرات تا بهینه‌سازی توابع، همه را با مثال‌های کاربردی توضیح خواهیم داد."
}, {
  id: 9,
  title: "انتگرال و محاسبات پیشرفته",
  author: "نیما کریمی",
  date: "2024-03-12",
  likes: 221,
  replies: 67,
  category: "ریاضیات",
  tags: ["ریاضی"],
  content: "در این مطلب به بررسی انتگرال و کاربردهای آن می‌کنیم. از محاسبه مساحت زیر منحنی تا حجم اجسام دورانی، همه را با روش‌های مختلف حل مسئله بررسی خواهیم کرد."
}, {
  id: 10,
  title: "ماتریس‌ها و دترمینان",
  author: "مینا حسینی",
  date: "2024-03-11",
  likes: 278,
  replies: 89,
  category: "ریاضیات",
  tags: ["ریاضی"],
  content: "در این درس با ماتریس‌ها و عملیات آن‌ها آشنا می‌شویم. از جمع و ضرب ماتریس‌ها گرفته تا محاسبه دترمینان و کاربرد آن در حل دستگاه معادلات خطی، همه را بررسی خواهیم کرد."
}, {
  id: 11,
  title: "احتمال و آمار",
  author: "کامران علوی",
  date: "2024-03-10",
  likes: 189,
  replies: 45,
  category: "ریاضیات",
  tags: ["ریاضی"],
  content: "در این مقاله مفاهیم پایه‌ای احتمال و آمار را بررسی می‌کنیم. از توزیع‌های احتمال تا آزمون‌های آماری، همه را با مثال‌های کاربردی توضیح خواهیم داد."
}, {
  id: 12,
  title: "آموزش پایتون مقدماتی",
  author: "زهرا تقوی",
  date: "2024-03-09",
  likes: 234,
  replies: 78,
  category: "برنامه نویسی",
  tags: ["برنامه نویسی"],
  content: "در این دوره با زبان برنامه‌نویسی پایتون آشنا می‌شویم. از متغیرها و ساختارهای کنترلی گرفته تا توابع و کلاس‌ها، همه را با مثال‌های عملی یاد خواهیم گرفت."
}, {
  id: 13,
  title: "جاوااسکریپت پیشرفته",
  author: "محمد عبدالله",
  date: "2024-03-08",
  likes: 167,
  replies: 45,
  category: "برنامه نویسی",
  tags: ["برنامه نویسی"],
  content: "در این دوره به مفاهیم پیشرفته جاوااسکریپت می‌پردازیم. از Promise و async/await گرفته تا الگوهای طراحی و بهینه‌سازی کد، همه را بررسی خواهیم کرد."
}, {
  id: 14,
  title: "آموزش React و TypeScript",
  author: "فاطمه الزهراء",
  date: "2024-03-07",
  likes: 198,
  replies: 67,
  category: "برنامه نویسی",
  tags: ["برنامه نویسی"],
  content: "در این دوره با فریم‌ورک React و TypeScript آشنا می‌شویم. از کامپوننت‌ها و هوک‌ها گرفته تا مدیریت state و type safety، همه را در قالب یک پروژه عملی یاد خواهیم گرفت."
}, {
  id: 15,
  title: "طراحی الگوریتم",
  author: "احمد حسین",
  date: "2024-03-06",
  likes: 145,
  replies: 34,
  category: "برنامه نویسی",
  tags: ["برنامه نویسی"],
  content: "در این درس به اصول طراحی الگوریتم می‌پردازیم. از الگوریتم‌های جستجو و مرتب‌سازی گرفته تا برنامه‌نویسی پویا و الگوریتم‌های گراف، همه را با تحلیل پیچیدگی زمانی و مکانی بررسی خواهیم کرد."
}];
const sortTopics = (topics: Topic[], activeTab: string, selectedCategory: string | null, searchQuery: string) => {
  let filteredTopics = topics;

  // Filter by category if selected
  if (selectedCategory) {
    filteredTopics = filteredTopics.filter(topic => topic.category === selectedCategory);
  }

  // Filter by search query if present
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTopics = filteredTopics.filter(topic => topic.title.toLowerCase().includes(query) || topic.author.toLowerCase().includes(query) || topic.category.toLowerCase().includes(query) || topic.tags?.some(tag => tag.toLowerCase().includes(query)));
  }
  const sortedTopics = [...filteredTopics];
  switch (activeTab) {
    case "most-liked":
      return sortedTopics.sort((a, b) => b.likes - a.likes);
    case "most-replied":
      return sortedTopics.sort((a, b) => b.replies - a.replies);
    default:
      return sortedTopics.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
};
export default function TopicList({
  activeTab,
  selectedCategory,
  searchQuery
}: {
  activeTab: string;
  selectedCategory: string | null;
  searchQuery: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const sortedTopics = sortTopics(topics, activeTab, selectedCategory, searchQuery);
  const totalPages = Math.ceil(sortedTopics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = sortedTopics.slice(startIndex, endIndex);
  const navigate = useNavigate();
  const toFarsiNumber = (n: number) => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return n.toString().split('').map(x => farsiDigits[Number(x)]).join('');
  };
  const renderPaginationItems = () => {
    let items = [];

    // Add previous button
    items.push(<PaginationItem key="prev">
        <PaginationLink onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} className={`flex-row-reverse ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}>
          <ChevronRight className="h-4 w-4" />
        </PaginationLink>
      </PaginationItem>);

    // Add first page
    items.push(<PaginationItem key="1">
        <PaginationLink onClick={() => setCurrentPage(1)} isActive={currentPage === 1}>
          {toFarsiNumber(1)}
        </PaginationLink>
      </PaginationItem>);

    // Add pages in range
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);
    if (startPage > 2) {
      items.push(<PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>);
    }
    for (let i = startPage; i <= endPage; i++) {
      items.push(<PaginationItem key={i}>
          <PaginationLink onClick={() => setCurrentPage(i)} isActive={currentPage === i}>
            {toFarsiNumber(i)}
          </PaginationLink>
        </PaginationItem>);
    }
    if (endPage < totalPages - 1) {
      items.push(<PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>);
    }

    // Add last page if not already included
    if (totalPages > 1) {
      items.push(<PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setCurrentPage(totalPages)} isActive={currentPage === totalPages}>
            {toFarsiNumber(totalPages)}
          </PaginationLink>
        </PaginationItem>);
    }

    // Add next button
    items.push(<PaginationItem key="next">
        <PaginationLink onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} className={`flex-row-reverse ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}>
          <ChevronLeft className="h-4 w-4" />
        </PaginationLink>
      </PaginationItem>);
    return items;
  };
  return <AnimatePresence mode="wait">
      <motion.div key={`${activeTab}-${selectedCategory}-${currentPage}`} initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -20
    }} transition={{
      duration: 0.3
    }} dir="rtl" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentTopics.map(topic => <motion.div key={topic.id} layout className="bg-white/50 backdrop-blur-sm rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between h-40">
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
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">
                      {topic.likes}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="text-xs font-medium text-gray-700">
                      {topic.replies}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate(`/topics/${topic.id}`)} className="text-xs">
                  مشاهده
                </Button>
              </div>
            </motion.div>)}
        </div>

        {totalPages > 1 && <Pagination dir="rtl" className="mt-8">
            <PaginationContent className="flex-row-reverse gap-1">
              {renderPaginationItems()}
            </PaginationContent>
          </Pagination>}
      </motion.div>
    </AnimatePresence>;
}