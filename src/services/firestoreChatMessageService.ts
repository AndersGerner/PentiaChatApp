import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { isChatMessage } from '../utils/guards';
import { firestore } from './firebaseConfig';
import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text?: string;
  imageUrl?: string;
  timestamp: FirebaseFirestoreTypes.Timestamp;
};

/**
 * Fetches chat messages for a specific chat room from Firestore.
 * @param chatId - The ID of the chat room.
 * @param lastMessageTimestamp - Timestamp of the last message to fetch messages after it.
 * @returns An array of ChatMessage objects.
 */
export const fetchMessages = async (
  chatId: string,
  lastMessageTimestamp?: FirebaseFirestoreTypes.Timestamp,
): Promise<ChatMessage[]> => {
  let query = firestore
    .collection('chatrooms')
    .doc(chatId)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .limit(50);

  if (lastMessageTimestamp) {
    query = query.startAfter(lastMessageTimestamp);
  }

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    if (isChatMessage(data)) {
      return data;
    }
    return null;
  }) as ChatMessage[];
};
/**
 * Listens for new messages in a specific chat room and invokes the callback with new messages.
 * @param chatId - The ID of the chat room.
 * @param callback - The callback function to invoke with new messages.
 * @returns A function to unsubscribe from the listener.
 */
export const listenForNewMessages = (
  chatId: string,
  callback: (messages: ChatMessage[]) => void,
) => {
  return firestore
    .collection('chatrooms')
    .doc(chatId)
    .collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => {
      const newMessages = snapshot
        .docChanges()
        .filter((change) => change.type === 'added')
        .map((change) => change.doc.data())
        .filter(isChatMessage);
      callback(newMessages);
    });
};

/**
 * Sends a message to a specific chat room in Firestore.
 * @param chatId - The ID of the chat room.
 * @param message - The message object to send.
 */
export const sendMessage = async (
  chatId: string,
  message: Omit<ChatMessage, 'id'>,
) => {
  try {
    const chatRoomRef = firestore.collection('chatrooms').doc(chatId);
    const messagesRef = chatRoomRef.collection('messages');
    const timestamp = firebase.firestore.Timestamp.fromDate(new Date());

    // Add the message to the messages sub-collection
    await messagesRef.add({
      ...message,
      timestamp,
    });

    // Update the chat room document with the latest message and timestamp
    await chatRoomRef.update({
      newestMessageTimestamp: timestamp,
      latestMessage: message.text || 'Image',
    });
  } catch (error) {
    console.error('Error sending message: ', error);
    throw error;
  }
};
/**
 * Uploads an image to Firebase Storage and returns its URL.
 * @param uri - The local URI of the image.
 * @param chatId - The ID of the chat room.
 * @returns The URL of the uploaded image.
 */
export const uploadImage = async (uri: string, chatId: string) => {
  // Generate a unique filename using the current timestamp and a random string
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 7);
  const filename = `${timestamp}-${randomString}.jpg`; // Assuming the image is a jpg

  // Adjust the file URI for iOS
  const fileUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  const ref = storage().ref().child(`chatrooms/${chatId}/${filename}`);
  await ref.putFile(fileUri);

  const imageUrl = await ref.getDownloadURL();
  return imageUrl;
};
