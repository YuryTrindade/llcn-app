import { Button, InputItem, Toast, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { RootStackParamList } from 'navigation'; // Ajuste o caminho conforme necessário
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { colors } from 'utils/colors';
import { firebaseAuth } from 'utils/firebase';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = firebaseAuth;
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const isButtonDisabled = loading || !email || !password;

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.success('Usuário cadastrado com sucesso!');
      navigation.navigate('Home', { name: 'Cíntia' });
    } catch (error) {
      Toast.fail('Não foi possível cadastrar o usuário. Revise os dados e tente novamente.');
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
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avoidingView: {
    flex: 1,
    width: '100%',
  },
  FormFlex: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 15,
  },
  Input: {
    color: colors.white,
  },
});
