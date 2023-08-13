import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

type ChatInputProps = {
  inputText: string;
  setInputText: (text: string) => void;
  handleSendMessage: () => void;
  handleImageUpload: () => void;
  handleCaptureImage: () => void; // New prop for capturing image
  loading: boolean;
};

const ChatInput: React.FC<ChatInputProps> = ({
  inputText,
  setInputText,
  handleSendMessage,
  handleImageUpload,
  handleCaptureImage, // New prop
  loading,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity onPress={handleCaptureImage}>
        <Icon name="camera" size={25} color="#333" style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleImageUpload}>
        <Icon name="photo" size={25} color="#333" style={styles.icon} />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type a message..."
      />
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Button title="Send" onPress={handleSendMessage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  icon: {
    marginHorizontal: 10,
  },
});

export default ChatInput;
