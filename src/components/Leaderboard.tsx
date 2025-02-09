
import { Trophy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaderboardData } from "@/types/topic";

interface LeaderboardProps {
  data: LeaderboardData;
}

export const Leaderboard = ({ data }: LeaderboardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#8B5CF6]" />
          <h2 className="text-lg font-semibold">برترین پاسخ‌دهندگان</h2>
        </div>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="weekly" className="flex-1">هفتگی</TabsTrigger>
          <TabsTrigger value="monthly" className="flex-1">ماهانه</TabsTrigger>
          <TabsTrigger value="allTime" className="flex-1">کل</TabsTrigger>
        </TabsList>

        {["weekly", "monthly", "allTime"].map((period) => (
          <TabsContent key={period} value={period}>
            <div className="space-y-4">
              {data[period].map((user, index) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-5">
                      {(index + 1).toLocaleString('fa-IR')}
                    </span>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="font-semibold text-[#8B5CF6]">
                    {user.score.toLocaleString('fa-IR')}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
