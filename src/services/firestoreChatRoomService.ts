import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { isChatRoom } from '../utils/guards';
import { firestore } from './firebaseConfig';

export type ChatRoom = {
  id: string;
  name: string;
  description: string;
  lastMessageTimestamp: FirebaseFirestoreTypes.Timestamp;
  latestMessage?: string;
};

/**
 * Fetches chat rooms from Firestore.
 * @returns An array of ChatRoom objects.
 */
export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
  const snapshot = await firestore
    .collection('chatrooms')
    .orderBy('lastMessageTimestamp', 'desc')
    .get();

  const chatRooms: ChatRoom[] = snapshot.docs
    .filter((doc) => isChatRoom(doc.data()))
    .map((doc) => {
      const data = doc.data();
      return { ...data, id: doc.id };
    }) as ChatRoom[];

  return chatRooms;
};
