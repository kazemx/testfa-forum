
import { UserCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Profile = () => {
  const navigate = useNavigate();
  const [aboutMe, setAboutMe] = useState("من یک کاربر فعال در انجمن هستم.");
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  
  // Profile form state
  const [firstName, setFirstName] = useState("kazem");
  const [lastName, setLastName] = useState("mortazavi");
  const [birthDate, setBirthDate] = useState("1995/07/07");
  
  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // These would ideally come from an API/database
  const stats = [
    { label: "درباره‌ی من", value: "" },
    { label: "پاسخ‌های من", value: "۲" },
    { label: "موضوع‌ها", value: "۵" },
    { label: "پشتیبانی", value: "۱" },
  ];

  // Dummy data - would come from API
  const myReplies = [
    { id: 1, title: "نحوه نصب React", date: "۱۴۰۲/۱۲/۱۵" },
    { id: 2, title: "مشکل در اجرای پروژه", date: "۱۴۰۲/۱۲/۱۰" },
  ];

  const myTopics = [
    { id: 1, title: "سوال در مورد TypeScript", date: "۱۴۰۲/۱۲/۲۰" },
    { id: 2, title: "راهنمایی برای Redux", date: "۱۴۰۲/۱۲/۱۸" },
  ];

  const myTickets = [
    { 
      id: 1, 
      title: "درخواست افزایش سطح دسترسی", 
      status: "پاسخ داده شده",
      date: "۱۴۰۲/۱۲/۱۵" 
    },
    { 
      id: 2, 
      title: "گزارش مشکل در ثبت پاسخ", 
      status: "در انتظار پاسخ",
      date: "۱۴۰۲/۱۲/۲۰" 
    },
  ];

  const handleNavigate = (path: string) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
      navigate('/profile');
    }
  };

  const handleSaveProfile = () => {
    // Here you would typically make an API call to save the profile
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Here you would typically make an API call to change the password
    if (newPassword !== confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }
    setIsPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8" dir="rtl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold">ویرایش پروفایل</h1>
            </div>
          </div>
          
          <div className="space-y-6">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <TabsTrigger
                    key={index}
                    value={["about", "replies", "topics", "support"][index]}
                    className="text-lg w-full text-right pr-4"
                  >
                    <div className="text-right w-full">
                      <div>{stat.label}</div>
                      <div className="text-xl font-bold text-primary mt-1">
                        {stat.value || "-"}
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-right">نام</label>
                      <Input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="text-right"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right">نام خانوادگی</label>
                      <Input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="text-right"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right">روز تولد</label>
                      <Input
                        type="text"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="text-right"
                        dir="rtl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsPasswordDialogOpen(true)}
                        className="w-full"
                      >
                        تغییر گذرواژه
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Button onClick={handleSaveProfile}>
                        ذخیره تغییرات
                      </Button>
                      <h3 className="text-lg font-semibold">درباره‌ی من</h3>
                    </div>
                    {isEditing ? (
                      <Textarea
                        value={aboutMe}
                        onChange={(e) => setAboutMe(e.target.value)}
                        className="min-h-[150px] text-right"
                        dir="rtl"
                      />
                    ) : (
                      <p className="text-gray-600 text-right">{aboutMe}</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="replies" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">عنوان</TableHead>
                      <TableHead className="text-right">تاریخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myReplies.map((reply) => (
                      <TableRow 
                        key={reply.id}
                        className="cursor-pointer"
                        onClick={() => handleNavigate(`/topic/${reply.id}`)}
                      >
                        <TableCell className="text-right">{reply.title}</TableCell>
                        <TableCell className="text-right">{reply.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="topics" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-right">عنوان</TableHead>
                      <TableHead className="text-right">تاریخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myTopics.map((topic) => (
                      <TableRow 
                        key={topic.id}
                        className="cursor-pointer"
                        onClick={() => handleNavigate(`/topic/${topic.id}`)}
                      >
                        <TableCell className="text-right">{topic.title}</TableCell>
                        <TableCell className="text-right">{topic.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="support" className="mt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Button onClick={() => handleNavigate('/new-ticket')}>
                      ثبت تیکت جدید
                    </Button>
                    <h3 className="text-lg font-semibold">تیکت‌های پشتیبانی</h3>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">عنوان</TableHead>
                        <TableHead className="text-right">وضعیت</TableHead>
                        <TableHead className="text-right">تاریخ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myTickets.map((ticket) => (
                        <TableRow 
                          key={ticket.id}
                          className="cursor-pointer"
                          onClick={() => handleNavigate(`/ticket/${ticket.id}`)}
                        >
                          <TableCell className="text-right">{ticket.title}</TableCell>
                          <TableCell className="text-right">{ticket.status}</TableCell>
                          <TableCell className="text-right">{ticket.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">تغییر گذرواژه</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="block text-right">گذرواژه کنونی</label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-right">گذرواژه جدید</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-right">تکرار گذرواژه</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <Button
              onClick={handleChangePassword}
              className="w-full mt-4"
            >
              تغییر گذرواژه
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
