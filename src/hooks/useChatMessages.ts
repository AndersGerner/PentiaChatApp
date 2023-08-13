import { useState, useEffect, useCallback } from 'react';
import { auth, firestore } from '../services/firebaseConfig';
import {
  ChatMessage,
  fetchMessages,
  sendMessage,
  uploadImage,
} from '../services/firestoreChatMessageService';
import {
  checkPermissionStatusForRoom,
  updatePermissionStatusForRoom,
} from '../services/firestoreUserService';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from '@react-native-firebase/app';
import { requestPushPermission } from '../services/pushNotificationService';

export const useChatMessages = (chatId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState<
    FirebaseFirestoreTypes.Timestamp | undefined
  >();
  const [hasRequestedPermissionForRoom, setHasRequestedPermissionForRoom] =
    useState(false);

  // Check if the user has been prompted for notifications for the current room.
  useEffect(() => {
    const checkPermissionStatus = async () => {
      const hasPermission = await checkPermissionStatusForRoom(chatId);
      setHasRequestedPermissionForRoom(hasPermission);
    };

    checkPermissionStatus();
  }, [chatId]);

  // Subscribe to chat messages from Firestore.
  useEffect(() => {
    const unsubscribe = firestore
      .collection('chatrooms')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatMessage[];
        setMessages(fetchedMessages);
      });

    return () => unsubscribe();
  }, [chatId]);

  // Load older messages when the user scrolls to the top.
  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      const newMessages = await fetchMessages(chatId, lastMessageTimestamp);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      if (newMessages.length > 0) {
        setLastMessageTimestamp(newMessages[newMessages.length - 1].timestamp);
      }
    } catch (error) {
      console.error('Error fetching messages: ', error);
    } finally {
      setLoading(false);
    }
    setInitialLoad(false);
  }, [lastMessageTimestamp, chatId]);

  const handleSendMessage = async (inputText: string) => {
    if (inputText.trim().length === 0) return;

    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error('No user is currently logged in.');
      return;
    }
    setLoading(true);
    const newMessage: Omit<ChatMessage, 'id'> = {
      text: inputText,
      senderName: currentUser.displayName || 'Anonymous',
      senderId: currentUser.uid,
      senderAvatar: 'path_to_default_user_icon',
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
    };

    try {
      await sendMessage(chatId, newMessage);
    } catch (error) {
      console.error('Error sending message: ', error);
    } finally {
      setLoading(false);
      if (!hasRequestedPermissionForRoom) {
        await requestPushPermission();
        setHasRequestedPermissionForRoom(true);
        await updatePermissionStatusForRoom(chatId);
      }
    }
  };

  const handleImageUpload = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setLoading(true);
      const imageUrl = await uploadImage(image.path, chatId);

      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No user is currently logged in.');
        return;
      }

      const newMessage: Omit<ChatMessage, 'id'> = {
        imageUrl: imageUrl,
        senderName: currentUser.displayName || 'Anonymous',
        senderId: currentUser.uid,
        senderAvatar: 'path_to_default_user_icon',
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      await sendMessage(chatId, newMessage);
    } catch (error) {
      console.error('Error uploading image: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCaptureImage = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });
      setLoading(true);
      const imageUrl = await uploadImage(image.path, chatId);

      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No user is currently logged in.');
        return;
      }

      const newMessage: Omit<ChatMessage, 'id'> = {
        imageUrl: imageUrl,
        senderName: currentUser.displayName || 'Anonymous',
        senderId: currentUser.uid,
        senderAvatar: 'path_to_default_user_icon',
        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      await sendMessage(chatId, newMessage);
    } catch (error) {
      console.error('Error capturing image: ', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    initialLoad,
    loadMessages,
    handleSendMessage,
    handleImageUpload,
    handleCaptureImage,
  };
};
