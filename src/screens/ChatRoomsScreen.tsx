import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { navigate } from '../navigation/AppNavigator';
import { useChatRooms } from '../hooks/useChatRooms';
import ChatRoomCard from '../components/ChatRoomCard';

const ChatRoomsScreen = () => {
  const { chatRooms, loading, refetch } = useChatRooms();

  const handleRoomPress = (chatRoomId: string) => {
    navigate('Chat', { chatId: chatRoomId });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          contentContainerStyle={styles.list}
          data={chatRooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatRoomCard chatRoom={item} onPress={handleRoomPress} />
          )}
          onRefresh={refetch}
          refreshing={loading}
          initialNumToRender={20}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 10,
  },
});

export default ChatRoomsScreen;
