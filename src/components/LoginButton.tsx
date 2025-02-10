
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserCircle } from "lucide-react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  
  // Temporary auth state - replace with Supabase auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const testUser = {
    phone: "09010814978",
    password: "1234",
    name: "کاربر تست"
  };

  const handleLogin = (phone: string, password: string) => {
    if (phone === testUser.phone && password === testUser.password) {
      setIsAuthenticated(true);
      setShowLoginModal(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary/10">
                <UserCircle className="h-4 w-4 text-primary" />
              </AvatarFallback>
            </Avatar>
            <span>خروج</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48" dir="rtl">
          <DropdownMenuItem onClick={() => navigate('/profile')}>
            پروفایل کاربری
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            خروج از حساب
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setShowLoginModal(true)}
      >
        <LogIn className="w-4 h-4" />
        <span>ورود</span>
      </Button>

      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onRegisterClick={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
        onLogin={handleLogin}
      />

      <RegisterModal
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        onLoginClick={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </>
  );
};

export default LoginButton;
