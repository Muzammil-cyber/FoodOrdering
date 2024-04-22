import { registerForPushNotificationsAsync } from "@/lib/notifications";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import supabase from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const { profile } = useAuth();

  const savePushToken = async (token: string | undefined) => {
    setExpoPushToken(token ?? "");
    if (token)
      await supabase
        .from("profiles")
        .update({ expo_push_token: token })
        .eq("id", profile.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => savePushToken(token))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  //   console.log(notification);
  //   console.log(expoPushToken);

  return <>{children}</>;
};

export default NotificationProvider;
