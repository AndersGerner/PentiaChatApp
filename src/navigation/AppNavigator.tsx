import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

import ChatRoomsScreen from '../screens/ChatRoomsScreen';
import ChatScreen from '../screens/ChatScreen';
import LoginScreen from '../screens/LoginScreen';

export type RootStackParamList = {
  Login: undefined;
  ChatRooms: undefined;
  Chat: { chatId: string };
};

/**
 * Setting up navigationRef for custom navigate method that can be used typesafed within the scenes and for deep linking
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
export const navigate = <RouteName extends keyof RootStackParamList>(
  name: RouteName,
  params?: RootStackParamList[RouteName],
) => {
  const action = CommonActions.navigate(name, params);
  if (navigationRef.isReady()) {
    navigationRef.dispatch(action);
  }
};

const Stack = createStackNavigator<RootStackParamList>();
const AppNavigator = ({ isLoggedin }: { isLoggedin: boolean }) => {
  return (
    <Stack.Navigator initialRouteName={isLoggedin ? 'ChatRooms' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRooms"
        component={ChatRoomsScreen}
        options={{
          headerLeft: () => null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
