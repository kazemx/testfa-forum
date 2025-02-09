
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const LoginButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

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
