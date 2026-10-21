export interface Topic {
  title: string;
  icon: string;
  image: string;
}

export interface Level {
  level: number;
  title: string;
  description: string;
  topics: Topic[];
  color: string;
  bgColor: string;
  shelfColor: string;
  glowColor: string;
}