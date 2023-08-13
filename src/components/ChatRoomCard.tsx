import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ChatRoom as ChatRoomType } from '../services/firestoreChatRoomService';

type ChatRoomCardProps = {
  chatRoom: ChatRoomType;
  onPress: (chatRoomId: string) => void;
};

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ chatRoom, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onPress(chatRoom.id)}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.roomName}>{chatRoom.name}</Text>
        <Text style={styles.roomDescription}>{chatRoom.description}</Text>
        <Text style={styles.latestMessage}>{chatRoom.latestMessage}</Text>
        <Text style={styles.messageTimestamp}>
          {chatRoom.lastMessageTimestamp.toDate().toLocaleString()}
        </Text>
      </View>
      <Icon name="chevron-right" size={20} color="#aaa" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    // For iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    // For Android shadow
    elevation: 3,
  },
  listItemContent: {
    flex: 1,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomDescription: {
    fontSize: 14,
    color: '#777',
  },
  latestMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
});

export default ChatRoomCard;
