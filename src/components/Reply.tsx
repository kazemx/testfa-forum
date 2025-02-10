
import { useState } from "react";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Reply as ReplyType } from "@/types/topic";
import LoginButton from "./LoginButton";
import LoginModal from "./LoginModal";

interface ReplyProps {
  reply: ReplyType;
  onReply: (parentId: number) => void;
}

export const Reply = ({ reply, onReply }: ReplyProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { toast } = useToast();

  // Temporary auth state - replace with actual auth state later
  const isAuthenticated = false;

  const handleReplyClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    setShowReplyForm(!showReplyForm);
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "خطا",
        description: "لطفا پاسخ خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "موفق",
      description: "پاسخ شما با موفقیت ثبت شد",
    });
    setReplyContent("");
    setShowReplyForm(false);
  };

  const handleLogin = (phone: string, password: string) => {
    // Implement login logic here
    console.log("Login attempt:", { phone, password });
    setShowLoginModal(false);
  };

  return (
    <div className="border-r border-gray-200 pr-4 mb-4">
      <div className="bg-gray-50 rounded-lg p-4 mb-2">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium text-gray-900">{reply.author}</div>
          <div className="text-sm text-gray-500">{new Date(reply.date).toLocaleDateString('fa-IR')}</div>
        </div>
        <p className="text-gray-700 mb-2">{reply.content}</p>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <ThumbsUp className="w-4 h-4" />
            <span>{reply.likes}</span>
          </button>
          <button 
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
            onClick={handleReplyClick}
          >
            <MessageCircle className="w-4 h-4" />
            <span>پاسخ</span>
          </button>
        </div>
      </div>

      {showReplyForm && (
        <div className="mt-2 mb-4">
          <Textarea
            placeholder="پاسخ خود را بنویسید..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-2"
          />
          <div className="flex gap-2">
            <Button onClick={handleSubmitReply}>ارسال پاسخ</Button>
            <Button variant="outline" onClick={() => setShowReplyForm(false)}>انصراف</Button>
          </div>
        </div>
      )}

      <LoginModal 
        open={showLoginModal} 
        onOpenChange={setShowLoginModal}
        onRegisterClick={() => {
          setShowLoginModal(false);
          // Handle register click here
        }}
        onLogin={handleLogin}
      />

      {reply.replies && reply.replies.length > 0 && (
        <div className="mr-4">
          {reply.replies.map((nestedReply) => (
            <Reply key={nestedReply.id} reply={nestedReply} onReply={onReply} />
          ))}
        </div>
      )}
    </div>
  );
};
