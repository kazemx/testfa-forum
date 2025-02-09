
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Book, FlaskConical, ChartLine, Signal, Shield, Microscope, Earth, Users, BookOpen, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    case "ریاضیات":
      return <ChartLine className="w-4 h-4 text-gray-600" />;
    case "زیست شناسی":
      return <Microscope className="w-4 h-4 text-gray-600" />;
    case "شیمی":
      return <FlaskConical className="w-4 h-4 text-gray-600" />;
    case "فیزیک":
      return <Signal className="w-4 h-4 text-gray-600" />;
    case "علوم و فنون":
      return <Shield className="w-4 h-4 text-gray-600" />;
    case "زمین شناسی":
    case "جغرافیا":
      return <Earth className="w-4 h-4 text-gray-600" />;
    case "جامعه شناسی":
      return <Users className="w-4 h-4 text-gray-600" />;
    case "ادبیات فارسی":
    case "عربی":
    case "زبان انگلیسی":
      return <BookOpen className="w-4 h-4 text-gray-600" />;
    default:
      return <Book className="w-4 h-4 text-gray-600" />;
  }
};

const topics: Topic[] = [
  {
    id: 1,
    title: "مفاهیم پایه‌ای ریاضیات",
    author: "سارا چن",
    date: "2024-03-20",
    likes: 245,
    replies: 89,
    category: "ریاضیات"
  },
  {
    id: 2,
    title: "سیستم‌های زیستی",
    author: "علی کیم",
    date: "2024-03-19", 
    likes: 189,
    replies: 156,
    category: "زیست شناسی"
  },
  {
    id: 3,
    title: "واکنش‌های شیمیایی",
    author: "مریم گارسیا",
    date: "2024-03-18",
    likes: 312,
    replies: 67,
    category: "شیمی"
  },
  {
    id: 4,
    title: "قوانین نیوتن",
    author: "جان اسمیت", 
    date: "2024-03-17",
    likes: 178,
    replies: 45,
    category: "فیزیک"
  },
  {
    id: 5,
    title: "اصول علوم و فنون",
    author: "امیلی براون",
    date: "2024-03-16",
    likes: 156,
    replies: 34,
    category: "علوم و فنون"
  },
  {
    id: 6,
    title: "زمین‌شناسی عمومی",
    author: "رضا احمدی",
    date: "2024-03-15",
    likes: 234,
    replies: 78,
    category: "زمین شناسی"
  },
  {
    id: 7,
    title: "جامعه‌شناسی مدرن",
    author: "سحر محمدی",
    date: "2024-03-14",
    likes: 167,
    replies: 43,
    category: "جامعه شناسی"
  },
  {
    id: 8,
    title: "فلسفه اسلامی",
    author: "علی رضایی",
    date: "2024-03-13",
    likes: 198,
    replies: 56,
    category: "فلسفه"
  },
  {
    id: 9,
    title: "منطق ریاضی",
    author: "نیما کریمی",
    date: "2024-03-12",
    likes: 221,
    replies: 67,
    category: "منطق"
  },
  {
    id: 10,
    title: "تاریخ ایران باستان",
    author: "مینا حسینی",
    date: "2024-03-11",
    likes: 278,
    replies: 89,
    category: "تاریخ"
  },
  {
    id: 11,
    title: "جغرافیای طبیعی",
    author: "کامران علوی",
    date: "2024-03-10",
    likes: 189,
    replies: 45,
    category: "جغرافیا"
  },
  {
    id: 12,
    title: "اقتصاد خرد و کلان",
    author: "زهرا تقوی",
    date: "2024-03-09",
    likes: 234,
    replies: 78,
    category: "اقتصاد"
  }
];

const sortTopics = (topics: Topic[], activeTab: string, selectedCategory: string | null, searchQuery: string) => {
  let filteredTopics = topics;
  
  // Filter by category if selected
  if (selectedCategory) {
    filteredTopics = filteredTopics.filter(topic => topic.category === selectedCategory);
  }
  
  // Filter by search query if present
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredTopics = filteredTopics.filter(topic => 
      topic.title.toLowerCase().includes(query) ||
      topic.author.toLowerCase().includes(query) ||
      topic.category.toLowerCase().includes(query)
    );
  }

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
    items.push(
      <PaginationItem key="prev">
        <PaginationLink 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="flex-row-reverse"
          disabled={currentPage === 1}
        >
          <ChevronRight className="h-4 w-4" />
        </PaginationLink>
      </PaginationItem>
    );

    // Add first page
    items.push(
      <PaginationItem key="1">
        <PaginationLink 
          onClick={() => setCurrentPage(1)}
          isActive={currentPage === 1}
        >
          {toFarsiNumber(1)}
        </PaginationLink>
      </PaginationItem>
    );

    // Add pages in range
    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {toFarsiNumber(i)}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Add last page if not already included
    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
          >
            {toFarsiNumber(totalPages)}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add next button
    items.push(
      <PaginationItem key="next">
        <PaginationLink 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="flex-row-reverse"
          disabled={currentPage === totalPages}
        >
          <ChevronLeft className="h-4 w-4" />
        </PaginationLink>
      </PaginationItem>
    );

    return items;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${activeTab}-${selectedCategory}-${currentPage}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        dir="rtl"
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentTopics.map((topic) => (
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
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
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

        {totalPages > 1 && (
          <Pagination dir="rtl" className="mt-8">
            <PaginationContent className="flex-row-reverse gap-1">
              {renderPaginationItems()}
            </PaginationContent>
          </Pagination>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
