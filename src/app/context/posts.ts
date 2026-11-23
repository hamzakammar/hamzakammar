export interface Post {
  slug: string;
  title: string;
  date: string;
  dateTime: string;
  description: string;
}

export const Posts: Post[] = [
  {
    slug: "agent-previews",
    title: "What search previews do to agent efficiency",
    date: "Nov 2026",
    dateTime: "2026-11",
    description:
      "Personal agents are the future of AI interactions. But the more they can do for you, the more of your life they need access to.",
  },
];
