import { Music, Clock, Calendar, TrendingUp, Shuffle } from "lucide-react";

export const sortOptions = [
  {
    value: "popularity",
    label: "Popularity",
    icon: TrendingUp,
    description: "Most popular first",
  },
  { value: "name", label: "Alphabetical", icon: Music, description: "A to Z" },
  {
    value: "background",
    label: "Background",
    icon: Music,
    description: "Background score",
  },
  {
    value: "x",
    label: "Synthetic",
    icon: Shuffle,
    description: "Synthetic elements",
  },
  {
    value: "y",
    label: "Atmospheric",
    icon: Music,
    description: "Atmospheric quality",
  },
  {
    value: "tempo",
    label: "Tempo",
    icon: Clock,
    description: "Speed of music",
  },
  {
    value: "duration",
    label: "Duration",
    icon: Clock,
    description: "Track length",
  },
  {
    value: "added",
    label: "Recently Added",
    icon: Calendar,
    description: "Newest additions",
  },
];
