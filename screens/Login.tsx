import { Button, InputItem, Toast, WhiteSpace, WingBlank } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { RootStackParamList } from 'navigation';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { colors } from 'utils/colors';
import { firebaseAuth, firebaseStore } from 'utils/firebase';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = firebaseAuth;
  const store = firebaseStore;
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const isButtonDisabled = loading || !email || !password;

  const signIn = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(store, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        AsyncStorage.setItem('user', JSON.stringify(userData));
        Toast.success('Seja bem-vindo!');
        navigation.navigate('Home');
      } else {
        Toast.fail('Usuário não encontrado.');
      }
    } catch (error) {
      Toast.fail('Não foi possível acessar, tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <WingBlank style={styles.FormFlex}>
          <InputItem
            style={styles.Input}
            placeholder="Login"
            value={email}
            placeholderTextColor={colors.white}
            onChangeText={setEmail}
          />
          <InputItem
            style={styles.Input}
            clear
            type="password"
            placeholder="Senha"
            value={password}
            placeholderTextColor={colors.white}
            onChangeText={setPassword}
          />
          <WhiteSpace />
          <Button size="large" onPress={signIn} disabled={isButtonDisabled}>
            {loading ? 'Carregando...' : 'Entrar'}
          </Button>
        </WingBlank>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avoidingView: {
    width: '100%',
  },
  FormFlex: {
    gap: 15,
  },
  Input: {
    color: colors.white,
  },
});
