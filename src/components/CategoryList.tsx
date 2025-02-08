
import { motion } from "framer-motion";
import { Book, FlaskConical, ChartLine, Signal, Shield, Microscope, Earth, Users, BookOpen } from "lucide-react";

export type Category = {
  id: string;
  name: string;
  count: number;
  icon: JSX.Element;
};

export const categories: Category[] = [
  { id: "1", name: "ریاضیات", count: 150, icon: <ChartLine className="w-4 h-4" /> },
  { id: "2", name: "زیست شناسی", count: 89, icon: <Microscope className="w-4 h-4" /> },
  { id: "3", name: "شیمی", count: 76, icon: <FlaskConical className="w-4 h-4" /> },
  { id: "4", name: "فیزیک", count: 45, icon: <Signal className="w-4 h-4" /> },
  { id: "5", name: "علوم و فنون", count: 34, icon: <Shield className="w-4 h-4" /> },
  { id: "6", name: "زمین شناسی", count: 42, icon: <Earth className="w-4 h-4" /> },
  { id: "7", name: "جامعه شناسی", count: 38, icon: <Users className="w-4 h-4" /> },
  { id: "8", name: "فلسفه", count: 55, icon: <Book className="w-4 h-4" /> },
  { id: "9", name: "منطق", count: 29, icon: <BookOpen className="w-4 h-4" /> },
  { id: "10", name: "تاریخ", count: 67, icon: <Book className="w-4 h-4" /> },
  { id: "11", name: "جغرافیا", count: 44, icon: <Earth className="w-4 h-4" /> },
  { id: "12", name: "اقتصاد", count: 51, icon: <Book className="w-4 h-4" /> },
  { id: "13", name: "ادبیات فارسی", count: 95, icon: <BookOpen className="w-4 h-4" /> },
  { id: "14", name: "دین و زندگی", count: 72, icon: <Book className="w-4 h-4" /> },
  { id: "15", name: "عربی", count: 63, icon: <BookOpen className="w-4 h-4" /> },
  { id: "16", name: "زبان انگلیسی", count: 88, icon: <Book className="w-4 h-4" /> },
];

const CategoryList = ({ 
  selectedCategory, 
  onSelectCategory 
}: { 
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}) => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-64 h-[calc(100vh-2rem)] overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">دسته‌بندی‌ها</h2>
      <div className="space-y-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`flex justify-between items-center p-2 hover:bg-white/30 rounded-md cursor-pointer transition-colors ${
            selectedCategory === null ? 'bg-white/30' : ''
          }`}
          onClick={() => onSelectCategory(null)}
        >
          <span className="text-gray-700">همه</span>
        </motion.div>
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            className={`flex justify-between items-center p-2 hover:bg-white/30 rounded-md cursor-pointer transition-colors ${
              selectedCategory === category.name ? 'bg-white/30' : ''
            }`}
            onClick={() => onSelectCategory(category.name)}
          >
            <div className="flex items-center gap-2">
              {category.icon}
              <span className="text-gray-700">{category.name}</span>
            </div>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
              {category.count}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
