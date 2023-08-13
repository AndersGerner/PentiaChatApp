import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';

import { Linking } from 'react-native';
import { storePushTokenForUser } from './firestoreUserService';
import { navigate } from '../navigation/AppNavigator';

// Request permission when user sends a message for the first time in a room
export const requestPushPermission = async () => {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    const currentUser = auth().currentUser;

    if (currentUser) {
      await storePushTokenForUser(currentUser.uid, token);
    }
  }
};

// Listen for when a notification is clicked
messaging()
  .getInitialNotification()
  .then((remoteMessage) => {
    if (
      remoteMessage &&
      remoteMessage.data &&
      remoteMessage.data.click_action
    ) {
      Linking.openURL(remoteMessage.data.click_action);
    }
  });

messaging().onNotificationOpenedApp((remoteMessage) => {
  if (remoteMessage && remoteMessage.data && remoteMessage.data.click_action) {
    navigate('Chat', { chatId: remoteMessage.data.chatId });
  }
});
