import { auth, firestore } from './firebaseConfig';
import firebase from '@react-native-firebase/app';

export const storePushTokenForUser = async (userId: string, token: string) => {
  const userRef = firestore.collection('users').doc(userId);

  const doc = await userRef.get();

  if (doc.exists) {
    await userRef.update({
      pushToken: token,
    });
  } else {
    await userRef.set({
      pushToken: token,
    });
  }
};

export const checkPermissionStatusForRoom = async (chatId: string) => {
  const userDoc = await firestore
    .collection('userPreferences')
    .doc(auth.currentUser?.uid)
    .get();
  const userData = userDoc.data();
  if (userData && userData.roomsPromptedForNotifications.includes(chatId)) {
    return true;
  }
  return false;
};

// Update after prompting the user about notification for chat room
export const updatePermissionStatusForRoom = async (chatId: string) => {
  const docRef = firestore
    .collection('userPreferences')
    .doc(auth.currentUser?.uid);
  const doc = await docRef.get();

  if (doc.exists) {
    await docRef.update({
      roomsPromptedForNotifications:
        firebase.firestore.FieldValue.arrayUnion(chatId),
    });
  } else {
    await docRef.set({
      roomsPromptedForNotifications: [chatId],
    });
  }
};
