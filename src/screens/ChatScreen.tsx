import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import ChatMessageRow from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { useChatMessages } from '../hooks/useChatMessages';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;
type Props = {
  route: ChatScreenRouteProp;
};

const ChatScreen = ({ route }: Props) => {
  const { chatId } = route.params;
  const {
    messages,
    loading,
    initialLoad,
    loadMessages,
    handleSendMessage,
    handleImageUpload,
    handleCaptureImage,
  } = useChatMessages(chatId);
  const [inputText, setInputText] = useState('');

  const sendMessageHandler = () => {
    handleSendMessage(inputText);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <ChatMessageRow message={item} />}
        onEndReached={initialLoad ? undefined : loadMessages}
        onEndReachedThreshold={0.1}
        inverted
      />
      <ChatInput
        inputText={inputText}
        setInputText={setInputText}
        handleSendMessage={sendMessageHandler}
        handleImageUpload={handleImageUpload}
        loading={loading}
        handleCaptureImage={handleCaptureImage}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default ChatScreen;
