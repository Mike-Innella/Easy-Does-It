import { useMemo } from "react";

import { RECOVERY_LINES } from "../lib/copy";
import { MS_PER_DAY } from "../lib/soberStats";

// Rotate through recovery lines using the day number to keep it stable for 24 hours
export const useDailyRecoveryLine = () => {
  return useMemo(() => {
    const daysSinceEpoch = Math.floor(Date.now() / MS_PER_DAY);
    return RECOVERY_LINES[daysSinceEpoch % RECOVERY_LINES.length];
  }, []);
};
