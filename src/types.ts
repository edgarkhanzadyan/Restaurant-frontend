export type UserRole = 'regular' | 'owner' | 'admin';

export type User = {
  _id: string;
  name: string;
  role: UserRole;
  email: string;
};

export type UserWithToken = User & {
  token: string;
};

export type Restaurant = {
  _id: string;
  description: string;
  location: string;
  name: string;
  owner: string;
  reviews: Review[];
  averageScore: number;
  // base64
  image: string;
};

export type FullRestaurant = Restaurant & {
  popularity: number;
  createdAt: string;
  updatedAt: string;
};

export type Review = {
  _id: string;
  reviewer: string;
  restaurant: string;
  comment: string;
  score: number;
  createdAt: string;
  reply?: ReviewReply;
};

export type ReviewReply = {
  _id: string;
  replier: string;
  comment: string;
  createdAt: string;
};
