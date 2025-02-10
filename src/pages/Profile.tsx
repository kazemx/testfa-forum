
import { UserCircle } from "lucide-react";

const Profile = () => {
  // These would ideally come from an API/database
  const stats = [
    { label: "درباره‌ی من", value: "" },
    { label: "پاسخ‌های من", value: "۲" },
    { label: "موضوع‌ها", value: "۵" },
    { label: "پشتیبانی", value: "۱" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">کاربر تست</h1>
              <p className="text-gray-500">۰۹۰۱۰۸۱۴۹۷۸</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold mb-2">{stat.label}</h3>
                  <p className="text-3xl font-bold text-primary">
                    {stat.value || "-"}
                  </p>
                </div>
              ))}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-4">فعالیت‌های اخیر</h2>
              <p className="text-gray-500">هنوز فعالیتی ثبت نشده است.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
