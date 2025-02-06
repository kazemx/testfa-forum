
import { motion, AnimatePresence } from "framer-motion";

type Topic = {
  id: number;
  title: string;
  author: string;
  date: string;
  likes: number;
  replies: number;
};

const topics: Topic[] = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    author: "Sarah Chen",
    date: "2024-03-20",
    likes: 245,
    replies: 89,
  },
  {
    id: 2,
    title: "Modern JavaScript Practices",
    author: "Alex Kim",
    date: "2024-03-19",
    likes: 189,
    replies: 156,
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    author: "Maria Garcia",
    date: "2024-03-18",
    likes: 312,
    replies: 67,
  },
];

const sortTopics = (topics: Topic[], activeTab: string) => {
  const sortedTopics = [...topics];
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

export default function TopicList({ activeTab }: { activeTab: string }) {
  const sortedTopics = sortTopics(topics, activeTab);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {sortedTopics.map((topic) => (
          <motion.div
            key={topic.id}
            layout
            className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600">
                  by {topic.author} • {new Date(topic.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">
                    {topic.likes}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-600"
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
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-700">
                    {topic.replies}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-600"
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
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
