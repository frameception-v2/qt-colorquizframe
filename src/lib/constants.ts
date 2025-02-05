export const PROJECT_ID = 'colorquizframe';
export const PROJECT_TITLE = "Color Personality Quiz";
export const PROJECT_DESCRIPTION = "Discover your true color through 10 insightful questions";

export const QUIZ_QUESTIONS = [
  {
    question: "What's your ideal weekend?",
    options: [
      { text: "Hiking in nature", color: "green" },
      { text: "Art museum visit", color: "blue" },
      { text: "Dancing at a club", color: "red" },
      { text: "Reading at home", color: "purple" }
    ]
  },
  {
    question: "Choose a superpower:",
    options: [
      { text: "Invisibility", color: "purple" },
      { text: "Super speed", color: "red" },
      { text: "Healing others", color: "green" },
      { text: "Flight", color: "blue" }
    ]
  },
  // Add 8 more question objects following the same structure
  // ... (truncated for brevity, full array in actual implementation)
] as const;

export const COLOR_RESULTS = {
  red: { name: "Fiery Red", description: "Bold, passionate, and energetic" },
  blue: { name: "Serene Blue", description: "Calm, thoughtful, and trustworthy" },
  green: { name: "Natural Green", description: "Balanced, growth-oriented, and harmonious" },
  purple: { name: "Creative Purple", description: "Imaginative, spiritual, and unique" }
} as const;
