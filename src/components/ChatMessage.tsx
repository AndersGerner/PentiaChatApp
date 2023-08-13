import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ChatMessage } from '../services/firestoreChatMessageService';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatMessageRow: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const currentUser = auth().currentUser;
  const isCurrentUser = currentUser && currentUser.uid === message.senderId;

  const containerStyle = isCurrentUser
    ? styles.currentUserContainer
    : styles.otherUserContainer;

  return (
    <View style={containerStyle}>
      {!isCurrentUser && (
        <Icon name="user" size={30} color="#000" style={styles.avatar} />
      )}

      <View style={styles.messageContent}>
        {/* Sender Name */}
        <Text style={styles.senderName}>{message.senderName}</Text>

        {/* Message Content */}
        {message.imageUrl ? (
          <Image source={{ uri: message.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        )}

        {/* Message Date */}
        <Text style={styles.messageDate}>
          {message.timestamp?.toDate().toLocaleTimeString()}
        </Text>
      </View>

      {isCurrentUser && (
        <Icon name="user" size={30} color="#000" style={styles.avatar} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  currentUserMessage: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 25,
    maxWidth: '80%',
  },
  otherUserMessage: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 25,
    maxWidth: '80%',
  },

  currentUserContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  otherUserContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 5,
    alignSelf: 'flex-start',
  },
  avatar: {
    margin: 5,
  },
  messageContent: {
    maxWidth: '80%',
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageBubble: {
    backgroundColor: '#e6e6e6',
    borderRadius: 15,
    padding: 10,
  },
  messageText: {
    color: '#333',
  },
  messageDate: {
    fontSize: 10,
    color: 'grey',
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginTop: 5,
  },
});

export default ChatMessageRow;
