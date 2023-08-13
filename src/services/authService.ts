import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { getErrorCode } from '../utils/errors';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export const loginWithGoogle = async (): Promise<{
  user: FirebaseAuthTypes.User | null;
  error: string | null;
}> => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().signInWithCredential(googleCredential);
    const firebaseUser: FirebaseAuthTypes.User | null =
      userCredential.user || null;

    if (firebaseUser) {
      return { user: firebaseUser, error: null };
    } else {
      return { user: null, error: 'Failed to authenticate with Firebase.' };
    }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = handleGoogleLoginError(error);
      return { user: null, error: errorMessage };
    } else {
      return {
        user: null,
        error: 'An unexpected error occurred during Google login.',
      };
    }
  }
};

const handleGoogleLoginError = (error: Error): string => {
  const errorCode = getErrorCode(error);
  if (errorCode === statusCodes.SIGN_IN_CANCELLED) {
    return 'Google login was cancelled.';
  } else if (errorCode === statusCodes.IN_PROGRESS) {
    return 'Google login is in progress.';
  } else if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    return 'Google Play services are not available or outdated.';
  } else {
    return error.message || 'An unexpected error occurred during Google login.';
  }
};

export const loginWithFacebook = async (): Promise<{
  user: FirebaseAuthTypes.User | null;
  error: string | null;
}> => {
  try {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    const result = await LoginManager.logInWithPermissions(['public_profile']);

    if (result.isCancelled) {
      return {
        user: null,
        error: 'User cancelled the Facebook login process.',
      };
    }

    // Get the access token
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      return {
        user: null,
        error: 'Something went wrong obtaining the access token.',
      };
    }

    // Create a Firebase credential with the token
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign in with the credential
    const userCredential: FirebaseAuthTypes.UserCredential =
      await auth().signInWithCredential(facebookCredential);
    const firebaseUser: FirebaseAuthTypes.User | null =
      userCredential.user || null;

    if (firebaseUser) {
      return { user: firebaseUser, error: null };
    } else {
      return {
        user: null,
        error: 'Failed to authenticate with Firebase using Facebook.',
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { user: null, error: error.message };
    } else {
      return {
        user: null,
        error: 'An unexpected error occurred during Facebook login.',
      };
    }
  }
};
