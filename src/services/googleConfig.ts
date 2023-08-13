import { GoogleSignin } from '@react-native-google-signin/google-signin';

const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '150056297933-fvljakcr94n0ic0aoagu4a1coid41333.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
  });
};

export default configureGoogleSignIn;
