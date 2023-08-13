import React from 'react';
import { Modal, Text, View, Button, StyleSheet } from 'react-native';

type ErrorModalProps = {
  isVisible: boolean; // Determines if the modal should be visible
  message: string; // The error message to display
  onClose: () => void; // Callback to close the modal
  resetError?: () => void; // Optional callback to reset the error state
};

/**
 * ErrorModal is a component that displays an error message in a modal.
 * It provides an option to retry or acknowledge the error.
 */
const ErrorModal: React.FC<ErrorModalProps> = ({
  isVisible,
  message,
  resetError,
  onClose,
}) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{message}</Text>
          <Button
            title="Try Again"
            onPress={() => {
              // Reset the error state if provided
              if (resetError) {
                resetError();
              }
              // Close the modal
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
});

export default ErrorModal;
