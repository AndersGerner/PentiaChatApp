import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator, {
  navigate,
  navigationRef,
} from './src/navigation/AppNavigator';
import ErrorBoundaryWrapper from './src/components/errorHandling/ErrorBoundaryWrapper';
import { Linking, EmitterSubscription, Animated } from 'react-native';
import './src/services/firebaseConfig';
import auth from '@react-native-firebase/auth';

import { ErrorProvider } from './src/contexts/ErrorContext';
import configureGoogleSignIn from './src/services/googleConfig';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoggedin, setIsLoggedin] = React.useState<boolean | undefined>();
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    //Ensure that the Google Sign-In feature is initialized.
    configureGoogleSignIn();

    // Listen to authentication state changes and update the local state accordingly.
    const unsubscribe = auth().onAuthStateChanged((user) => {
      const { uid } = user || {};
      setIsLoggedin(!!uid);

      // Fade out animation for the splash screen.
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false);
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [fadeAnim]);

  useEffect(() => {
    // Handle deep linking by navigating to the appropriate screen based on the URL
    const handleDeepLink = (event: { url: string }) => {
      const { url } = event;
      const [, path, chatId] = url.match(/pentiachat:\/\/(room)\/(\d+)/) || [];

      if (path === 'room') {
        navigate('Chat', { chatId });
      }
    };

    // Set up a listener for deep linking events.
    const deepLinkListener: EmitterSubscription = Linking.addEventListener(
      'url',
      handleDeepLink,
    );

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      deepLinkListener.remove();
    };
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={{ ...styles.fullScreen, opacity: fadeAnim }}>
        <SplashScreen />
      </Animated.View>
    );
  }

  return (
    <ErrorProvider>
      <ErrorBoundaryWrapper>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator isLoggedin={isLoggedin ?? false} />
        </NavigationContainer>
      </ErrorBoundaryWrapper>
    </ErrorProvider>
  );
}

const styles = {
  fullScreen: {
    flex: 1,
  },
};

export default App;
