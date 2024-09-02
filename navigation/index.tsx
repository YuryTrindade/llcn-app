import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Home: undefined;
};

export type LoggedStackParamList = {
  Home: undefined;
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
      <AppStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </AppStack.Navigator>
  );
}

function RootStack() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthState = async () => {
      const firebaseUser = firebaseAuth.currentUser;

      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser) as User);
        } else {
          setUser(null);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(firebaseAuth, checkAuthState);

    checkAuthState();

    return () => unsubscribe();
  }, []);

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
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
