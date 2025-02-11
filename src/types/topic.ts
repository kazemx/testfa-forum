
export type Reply = {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Reply[];
};

export type Topic = {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  likes: number;
  content?: string;
  replies: Reply[];
  tags: string[];
};

export type LeaderboardUser = {
  id: number;
  name: string;
  score: number;
  avatar: string;
};

export type LeaderboardData = {
  weekly: LeaderboardUser[];
  monthly: LeaderboardUser[];
  allTime: LeaderboardUser[];
};

