import { useState, useEffect } from 'react';

import { useError } from '../contexts/ErrorContext';
import { ChatRoom, fetchChatRooms } from '../services/firestoreChatRoomService';

export const useChatRooms = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(false);
  const { setError } = useError();

  useEffect(() => {
    setLoading(true);
    const fetchRooms = async () => {
      try {
        const rooms = await fetchChatRooms();
        setChatRooms(rooms);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong while fetching chat rooms');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [setError]);

  return { chatRooms, loading, refetch: fetchChatRooms };
};
