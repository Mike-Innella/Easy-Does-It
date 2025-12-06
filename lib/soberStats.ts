// Base time unit used for streak math
export const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Returns raw day count and a human-friendly label (days, months, or years)
export const getSoberStats = (dateValue: Date | null) => {
  if (!dateValue) return { totalDays: null as number | null, formattedLabel: "" };
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return { totalDays: null as number | null, formattedLabel: "" };

  const today = new Date();
  const diff = Math.max(0, today.getTime() - parsed.getTime());
  const totalDays = Math.floor(diff / MS_PER_DAY);

  if (totalDays < 365) {
    return { totalDays, formattedLabel: `${totalDays} day${totalDays === 1 ? "" : "s"}` };
  }

  if (totalDays < 365 * 2) {
    const months = Math.floor(totalDays / 30);
    return { totalDays, formattedLabel: `${months} month${months === 1 ? "" : "s"}` };
  }

  const years = Math.floor(totalDays / 365);
  return { totalDays, formattedLabel: `${years} year${years === 1 ? "" : "s"}` };
};

// Append the word "clean" only when we have a valid label
export const formatCleanTimeLabel = (formattedLabel: string) =>
  formattedLabel ? `${formattedLabel} clean` : "";
