
import { UserCircle } from "lucide-react";

const Profile = () => {
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
