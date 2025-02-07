
import TopicTabs from "@/components/TopicTabs";
import CategoryList from "@/components/CategoryList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        <div className="flex-grow">
          <TopicTabs />
        </div>
        <div className="hidden md:block">
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Index;
