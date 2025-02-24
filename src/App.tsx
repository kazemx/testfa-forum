
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewQuestion from "./pages/NewQuestion";
import NotFound from "./pages/NotFound";
import TopicDetail from "./pages/TopicDetail";
import Profile from "./pages/Profile";
import TagTopics from "./pages/TagTopics";
import NewTicket from "./pages/NewTicket";
import TicketDetail from "./pages/TicketDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/new-question" element={<NewQuestion />} />
          <Route path="/topics/:id" element={<TopicDetail />} />
          <Route path="/tags" element={<TagTopics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new-ticket" element={<NewTicket />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
