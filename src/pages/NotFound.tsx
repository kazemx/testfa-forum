
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-lg text-center space-y-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
            alt="404 Robot"
            className="w-64 h-64 mx-auto object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute inset-0 bg-black/10 rounded-2xl" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">۴۰۴</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            صفحه مورد نظر پیدا نشد!
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            متأسفانه صفحه‌ای که به دنبال آن هستید در سایت وجود ندارد. لطفاً به صفحه اصلی بازگردید.
          </p>
        </div>

        <Button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl transition-all duration-300"
        >
          <ArrowRight className="w-4 h-4" />
          بازگشت به صفحه اصلی
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
