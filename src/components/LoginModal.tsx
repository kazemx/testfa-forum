
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterClick: () => void;
  onLogin: (phone: string, password: string) => void;
}

const LoginModal = ({ open, onOpenChange, onRegisterClick, onLogin }: LoginModalProps) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(phone, password);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right">ورود به حساب کاربری</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="phone">شماره موبایل</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              dir="ltr"
              className="text-right"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              dir="ltr"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-primary hover:underline"
            >
              عضویت در سایت
            </button>
            <button type="button" className="text-primary hover:underline">
              فراموشی رمز عبور
            </button>
          </div>
          <Button type="submit" className="w-full">
            ورود
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
