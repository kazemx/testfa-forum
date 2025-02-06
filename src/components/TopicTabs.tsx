
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import TopicList from "./TopicList";

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  { id: "latest", label: "Latest" },
  { id: "most-liked", label: "Most Liked" },
  { id: "most-replied", label: "Most Replied" },
];

export default function TopicTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
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
        <TopicList activeTab={activeTab} />
      </div>
    </div>
  );
}
