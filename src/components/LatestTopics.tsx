
import { MessageSquare } from "lucide-react";

interface LatestTopicsProps {
  category: string;
  topics: Array<{
    id: number;
    title: string;
    date: string;
    replies: any[];
  }>;
}

const LatestTopics = ({ category, topics }: LatestTopicsProps) => {
  // Get only the last 5 topics
  const latestTopics = topics.slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-[#8B5CF6]" />
        <h2 className="text-lg font-semibold">آخرین ارسال‌های {category}</h2>
      </div>
      
      <div className="space-y-4">
        {latestTopics.map((topic) => (
          <div key={topic.id} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 line-clamp-1">
                {topic.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {topic.replies.length.toLocaleString('fa-IR')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestTopics;
