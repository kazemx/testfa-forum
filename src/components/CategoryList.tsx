
import { motion } from "framer-motion";

type Category = {
  id: string;
  name: string;
  count: number;
};

const categories: Category[] = [
  { id: "1", name: "برنامه‌نویسی", count: 150 },
  { id: "2", name: "طراحی", count: 89 },
  { id: "3", name: "هوش مصنوعی", count: 76 },
  { id: "4", name: "شبکه", count: 45 },
  { id: "5", name: "امنیت", count: 34 },
];

const CategoryList = () => {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-64">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">دسته‌بندی‌ها</h2>
      <div className="space-y-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            className="flex justify-between items-center p-2 hover:bg-white/30 rounded-md cursor-pointer transition-colors"
          >
            <span className="text-gray-700">{category.name}</span>
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
