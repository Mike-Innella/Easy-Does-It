import { useMemo } from "react";

import { AFFIRMATIONS } from "../lib/copy";

// Pick a single affirmation when the app session starts
export const useAffirmation = () => {
  return useMemo(() => {
    const randomIndex = Math.floor(Math.random() * AFFIRMATIONS.length);
    return AFFIRMATIONS[randomIndex];
  }, []);
};
