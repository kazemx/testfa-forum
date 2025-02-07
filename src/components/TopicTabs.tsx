
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TopicList from "./TopicList";

const tabs = [
  { id: "latest", label: "جدیدترین" },
  { id: "most-liked", label: "محبوب‌ترین" },
  { id: "most-replied", label: "پربحث‌ترین" },
];

export default function TopicTabs({ 
  selectedCategory,
  searchQuery 
}: { 
  selectedCategory: string | null;
  searchQuery: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full max-w-4xl mx-auto" dir="rtl">
      <div className="relative">
        <div className="flex space-x-1 bg-white/20 backdrop-blur-sm rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative w-full px-6 py-3 text-sm font-medium transition-colors duration-300",
                "rounded-md hover:text-black/80",
                activeTab === tab.id
                  ? "text-black"
                  : "text-black/60 hover:text-black/80"
              )}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-md"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <TopicList 
          activeTab={activeTab} 
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
