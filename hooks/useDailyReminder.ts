import { useCallback, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REMINDER_STORAGE_KEY = "soberReminderId";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const getNextMorningTrigger = () => {
  const now = new Date();
  const trigger = new Date();
  trigger.setHours(9, 0, 0, 0);
  if (trigger <= now) {
    trigger.setDate(trigger.getDate() + 1);
  }
  return trigger;
};

export const useDailyReminder = () => {
  const [reminderId, setReminderId] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(REMINDER_STORAGE_KEY);
        if (stored) {
          setReminderId(stored);
          setEnabled(true);
        }
      } catch (e) {
        console.warn("Failed to load reminder preference", e);
      }
    };

    load();
  }, []);

  const requestPermissions = useCallback(async () => {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {
      return true;
    }
    const response = await Notifications.requestPermissionsAsync();
    return response.granted || response.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL;
  }, []);

  const enableReminder = useCallback(
    async (body: string) => {
      setLoading(true);
      setError("");
      try {
        const granted = await requestPermissions();
        if (!granted) {
          setError("Notifications are disabled. Enable them in settings to schedule a reminder.");
          return false;
        }

        if (reminderId) {
          await Notifications.cancelScheduledNotificationAsync(reminderId);
        }

        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: "Stay steady",
            body,
          },
          trigger: { hour: 9, minute: 0, repeats: true },
        });

        await AsyncStorage.setItem(REMINDER_STORAGE_KEY, id);
        setReminderId(id);
        setEnabled(true);
        return true;
      } catch (e) {
        console.warn("Failed to schedule reminder", e);
        setError("Could not schedule reminder.");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [reminderId, requestPermissions]
  );

  const disableReminder = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (reminderId) {
        await Notifications.cancelScheduledNotificationAsync(reminderId);
      }
      await AsyncStorage.removeItem(REMINDER_STORAGE_KEY);
      setReminderId(null);
      setEnabled(false);
      return true;
    } catch (e) {
      console.warn("Failed to cancel reminder", e);
      setError("Could not cancel reminder.");
      return false;
    } finally {
      setLoading(false);
    }
  }, [reminderId]);

  return {
    reminderEnabled: enabled,
    reminderLoading: loading,
    reminderError: error,
    enableReminder,
    disableReminder,
    nextReminderTime: getNextMorningTrigger(),
  };
};
