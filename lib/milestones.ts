type Milestone = {
  days: number;
  label: string;
};

// Ordered list of milestones to progress toward
const MILESTONES: Milestone[] = [
  { days: 30, label: "30 days clean 💚" },
  { days: 90, label: "90 days clean 💚" },
  { days: 180, label: "6 months clean 💚" },
  { days: 365, label: "1 year clean 💚" },
  { days: 365 + 182, label: "18 months clean 💚" },
  { days: 365 * 2, label: "2 years clean 💚" },
  { days: 365 * 3, label: "3 years clean 💚" },
  { days: 365 * 4, label: "4 years clean 💚" },
];

export const getNextMilestoneLabel = (cleanTimeInDays: number | null) => {
  if (cleanTimeInDays === null) return "";

  // Find the first milestone that is ahead of the current streak
  const nextMilestone = MILESTONES.find((milestone) => cleanTimeInDays < milestone.days);

  if (nextMilestone) {
    return `Next milestone: ${nextMilestone.label}`;
  }

  return "Next milestone: keep stacking days 💚";
};
