import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useError } from '../contexts/ErrorContext';
import { navigate } from '../navigation/AppNavigator';
import { loginWithFacebook, loginWithGoogle } from '../services/authService';

const LoginScreen = () => {
  const { setError } = useError();

  const handleGoogleLogin = async () => {
    const { user, error } = await loginWithGoogle();
    if (user) {
      navigate('ChatRooms');
    } else if (error) {
      setError(error);
    }
  };

  const handleFacebookLogin = async () => {
    const { user, error } = await loginWithFacebook();
    if (user) {
      navigate('ChatRooms');
    } else if (error) {
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Welcome to the Pentia chat app</Text>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Icon name="google" size={20} color="#fff" />
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.facebookButton}
        onPress={handleFacebookLogin}
      >
        <Icon name="facebook" size={20} color="#fff" />
        <Text style={styles.buttonText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db4437',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
});

export default LoginScreen;
