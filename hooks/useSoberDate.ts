import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { calculateDaysSober, parseDateInput, toISODate } from "../utils/date";

const STORAGE_KEY = "soberDate";

// Encapsulates reading/writing the saved sober date and keeping the day count fresh
export const useSoberDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [savedSoberDate, setSavedSoberDate] = useState<Date | null>(null);
  const [daysSober, setDaysSober] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Load saved date once at startup
  useEffect(() => {
    const loadSoberDate = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = parseDateInput(stored);
          if (parsed) {
            setSavedSoberDate(parsed.date);
            setSelectedDate(parsed.date);
            setDaysSober(calculateDaysSober(parsed.date));
            return;
          }
          // Clean up malformed data if present
          await AsyncStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.warn("Failed to load sober date", e);
      }
    };

    loadSoberDate();
  }, []);

  // Keep day count fresh while app is open
  useEffect(() => {
    if (!savedSoberDate) return;
    const updateDays = () => setDaysSober(calculateDaysSober(savedSoberDate));
    updateDays();
    const interval = setInterval(updateDays, 60 * 60 * 1000); // hourly
    return () => clearInterval(interval);
  }, [savedSoberDate]);

  const saveSoberDate = useCallback(async () => {
    setError("");
    if (!selectedDate) {
      setError("Pick a date first.");
      return false;
    }

    try {
      const iso = toISODate(selectedDate);
      await AsyncStorage.setItem(STORAGE_KEY, iso);
      setSavedSoberDate(selectedDate);
      setDaysSober(calculateDaysSober(selectedDate));
      return true;
    } catch (e) {
      console.warn("Failed to save sober date", e);
      setError("Could not save. Try again.");
      return false;
    }
  }, [selectedDate]);

  const clearSoberDate = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSavedSoberDate(null);
      setDaysSober(null);
      setSelectedDate(null);
      setError("");
      return true;
    } catch (e) {
      console.warn("Failed to clear sober date", e);
      setError("Could not clear. Try again.");
      return false;
    }
  }, []);

  return {
    selectedDate,
    setSelectedDate,
    savedSoberDate,
    daysSober,
    error,
    saveSoberDate,
    clearSoberDate,
  };
};
