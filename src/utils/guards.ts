import { ChatMessage } from '../services/firestoreChatMessageService';
import { ChatRoom } from '../services/firestoreChatRoomService';

/**
 * Type guard to check if the provided data is of type ChatRoom.
 * @param data - The data to check.
 * @returns True if the data matches the ChatRoom type, false otherwise.
 */
export function isChatRoom(data: unknown): data is ChatRoom {
  const { name, description, lastMessageTimestamp } = data as ChatRoom;
  return (
    typeof name === 'string' &&
    typeof description === 'string' &&
    lastMessageTimestamp !== undefined
  );
}

/**
 * Type guard to check if the provided data is of type ChatMessage.
 * @param data - The data to check.
 * @returns True if the data matches the ChatMessage type, false otherwise.
 */
export function isChatMessage(data: unknown): data is ChatMessage {
  const { senderId, senderName, senderAvatar, timestamp } = data as ChatMessage;
  return (
    typeof senderId === 'string' &&
    typeof senderName === 'string' &&
    typeof senderAvatar === 'string' &&
    timestamp !== undefined
  );
}
