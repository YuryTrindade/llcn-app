import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Home from 'screens/Home';
import Lobby from 'screens/Lobby';
import Login from 'screens/Login';
import Register from 'screens/Register';
import { colors } from 'utils/colors';
import { firebaseAuth } from 'utils/firebase';

import { BackButton } from '../components/BackButton';

export type RootStackParamList = {
  Lobby: undefined;
  Login: undefined;
  Register: undefined;
  Home: { name: string };
};

export type LoggedStackParamList = {
  Home: { name: string };
};

const AuthStack = createStackNavigator<RootStackParamList>();
const AppStack = createStackNavigator<LoggedStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="Lobby"
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerTintColor: colors.white,
        headerBackTitleVisible: false,
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        headerTitleStyle: styles.headerTitle,
      })}>
      <AuthStack.Screen name="Lobby" component={Lobby} options={{ headerShown: false }} />
      <AuthStack.Screen name="Login" component={Login} options={{ headerTitle: 'Login' }} />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{ headerTitle: 'Cadastro' }}
      />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: styles.headerStyle,
        headerTintColor: colors.white,
        headerBackTitleVisible: false,
        headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
        headerTitleStyle: styles.headerTitle,
      })}>
      <AppStack.Screen name="Home" component={Home} options={{ headerTitle: 'Tela Principal' }} />
    </AppStack.Navigator>
  );
}

export default function RootStack() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return <NavigationContainer>{user ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.primary,
    height: 100,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
