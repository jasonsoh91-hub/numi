export interface PatternCode {
  number: number;
  name: string;
  line: string;
  traits: string;
}

export const patternCodes: PatternCode[] = [
  {
    number: 1,
    name: "The Initiator",
    line: "You were not built to wait for permission.",
    traits: "Bold, independent, action-oriented, and driven to create your own path.",
  },
  {
    number: 2,
    name: "The Connector",
    line: "You feel what people do not say.",
    traits: "Sensitive, intuitive, supportive, emotionally intelligent, and deeply aware of unspoken tension.",
  },
  {
    number: 3,
    name: "The Communicator",
    line: "Your voice is part of your power.",
    traits: "Expressive, magnetic, creative, social, and naturally able to inspire through words or ideas.",
  },
  {
    number: 4,
    name: "The Builder",
    line: "You are the one people rely on — but who supports you?",
    traits: "Practical, responsible, grounded, structured, and built to create something stable.",
  },
  {
    number: 5,
    name: "The Explorer",
    line: "You are not difficult. You are built for movement.",
    traits: "Adaptable, curious, persuasive, energetic, and designed for variety, freedom, and experience.",
  },
  {
    number: 6,
    name: "The Nurturer",
    line: "You love deeply — but sometimes you forget yourself.",
    traits: "Warm, loyal, protective, healing, and naturally drawn to care, support, and guide.",
  },
  {
    number: 7,
    name: "The Analyst",
    line: "You notice what others miss.",
    traits: "Deep, observant, thoughtful, analytical, private, and drawn to truth, research, and meaning.",
  },
  {
    number: 8,
    name: "The Strategist",
    line: "You were built for more — but pressure follows power.",
    traits: "Ambitious, strategic, powerful, results-driven, and naturally drawn to leadership, influence, and achievement.",
  },
  {
    number: 9,
    name: "The Visionary",
    line: "You carry more emotion than people realise.",
    traits: "Compassionate, wise, inspiring, purpose-driven, and able to see the bigger picture.",
  },
];

export const getPatternByNumber = (num: number): PatternCode | undefined => {
  return patternCodes.find((p) => p.number === num);
};
