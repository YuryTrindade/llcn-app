import { Button, InputItem, Toast, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { RootStackParamList } from 'navigation';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { colors } from 'utils/colors';
import { firebaseAuth, firebaseStore } from 'utils/firebase';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [personalDoc, setPersonalDoc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = firebaseAuth;
  const store = firebaseStore;
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const createdAt = Timestamp.now();
  const isButtonDisabled = loading || !email || !password;

  const signUp = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(store, 'users', user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        userName,
        phone,
        personalDoc,
        email,
        createdAt,
      });
      navigation.navigate('Lobby');
    } catch (error) {
      Toast.fail('Não foi possível cadastrar o usuário. Revise os dados e tente novamente.');
    } finally {
      setLoading(false);
      Toast.success('Usuário cadastrado com sucesso!');
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
            placeholder="Nome"
            value={userName}
            placeholderTextColor={colors.white}
            onChangeText={setUserName}
          />
          <InputItem
            style={styles.Input}
            placeholder="Telefone"
            value={phone}
            placeholderTextColor={colors.white}
            onChangeText={setPhone}
          />
          <InputItem
            style={styles.Input}
            placeholder="OAB"
            value={personalDoc}
            placeholderTextColor={colors.white}
            onChangeText={setPersonalDoc}
          />
          <InputItem
            style={styles.Input}
            placeholder="email"
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
          <Button size="large" onPress={signUp} disabled={isButtonDisabled}>
            {loading ? 'Carregando...' : 'Cadastre-se'}
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
    gap: 20,
    bottom: 0,
  },
  Input: {
    color: colors.white,
  },
});
