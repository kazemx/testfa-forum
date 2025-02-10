import { UserCircle, ArrowLeft, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  const isMobile = useIsMobile();
  const [aboutMe, setAboutMe] = useState(`ما اینجا هستیم تا با پشتوانه یک تیم جوان، متخصص و خلاق خود فارغ التحصیلان دانشگاه های برتر کشور، شما را در رسیدن به آرزوهایتان همراهی کنیم تا با پشتوانه یک تیم جوان، متخصص و خلاق خود فارغ التحصیلان دانشگاه های برتر کشور، شما را در رسیدن به آرزوهایتان همراهی کنیم. ما مسیر موفقیت و همچنین رسیدن به جایگاه برتر را به خوبی می شناسیم. تیم ما قبل از شما بسیاری را در این مسیر همراهی کرده است. نوید ما به شما تضمین آینده است.`);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Profile form state
  const [firstName, setFirstName] = useState("کاظم");
  const [lastName, setLastName] = useState("مرتضوی");
  const [birthDate, setBirthDate] = useState("1995/07/07");
  
  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // These would ideally come from an API/database
  const stats = [
    { label: "درباره‌ی من", value: aboutMe },
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

  const handleLogout = () => {
    navigate('/');
  };

  const handleSaveProfile = () => {
    setIsProfileDialogOpen(false);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("رمز عبور و تکرار آن مطابقت ندارند");
      return;
    }
    setIsPasswordDialogOpen(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const TabsNavigation = () => (
    <TabsList className="flex flex-col h-auto w-48 space-y-2 bg-muted/50 p-2">
      {stats.map((stat, index) => (
        <TabsTrigger
          key={index}
          value={["about", "replies", "topics", "support", "settings"][index]}
          className="w-full text-right px-4 py-2"
        >
          <span>{stat.label}</span>
          {index !== 0 && (
            <span className="text-sm font-medium text-primary">
              {stat.value}
            </span>
          )}
        </TabsTrigger>
      ))}
      <TabsTrigger value="settings" className="w-full text-right px-4 py-2">
        ویرایش و تنظیمات
      </TabsTrigger>
    </TabsList>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="destructive" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleNavigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            بازگشت به صه اصلی
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8" dir="rtl">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="w-12 h-12 text-primary" />
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold">{firstName} {lastName}</h1>
                <div className="text-gray-600 max-w-xl mt-2 whitespace-pre-line break-words leading-relaxed">
                  {aboutMe}
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={() => setIsProfileDialogOpen(true)}>
              ویرایش پروفایل
            </Button>
          </div>
          
          <div className="space-y-6">
            {isMobile ? (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="mb-4">
                    <Menu className="h-4 w-4 ml-2" />
                    منو
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px] sm:w-[340px]">
                  <div className="py-4">
                    <Tabs defaultValue="about" className="w-full" orientation="vertical">
                      <TabsNavigation />
                    </Tabs>
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Tabs defaultValue="about" className="w-full flex flex-row-reverse gap-6">
                <TabsNavigation />
                <div className="flex-1">
                  <TabsContent value="about" className="mt-6">
                    <div className="text-right space-y-4">
                      <p><strong>نام:</strong> {firstName}</p>
                      <p><strong>نام خانوادگی:</strong> {lastName}</p>
                      <p><strong>تاریخ تولد:</strong> {birthDate}</p>
                      <Button
                        variant="outline"
                        onClick={() => setIsPasswordDialogOpen(true)}
                      >
                        تغییر گذرواژه
                      </Button>
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
                </div>
              </Tabs>
            )}
          </div>
        </div>
      </div>

      {/* Profile Edit Dialog */}
      <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-right">ویرایش پروفایل</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
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
              <label className="block text-right">تاریخ تولد</label>
              <Input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-right">درباره من</label>
              <Textarea
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>
            <Button
              onClick={handleSaveProfile}
              className="w-full mt-4"
            >
              ذخیره تغییرات
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
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
