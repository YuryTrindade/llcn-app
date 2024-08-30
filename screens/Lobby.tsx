import { Button, WingBlank } from '@ant-design/react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LogoComponent from 'components/LogoComponent';
import { StyleSheet, View } from 'react-native';
import { colors } from 'utils/colors';

import { RootStackParamList } from '../navigation';

type LobbyScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Lobby'>;

export default function Lobby() {
  const navigation = useNavigation<LobbyScreenNavigationProps>();

  return (
    <View style={styles.container}>
      <LogoComponent />
      <WingBlank style={styles.buttonsFlex}>
        <Button size="large" style={styles.buttons} onPress={() => navigation.navigate('Login')}>
          Faça Login
        </Button>
        <Button size="large" style={styles.buttons} onPress={() => navigation.navigate('Register')}>
          Cadastre-se
        </Button>
      </WingBlank>
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
  buttonsFlex: {
    width: '100%',
    bottom: -100,
    height: '15%',
    paddingHorizontal: 20,
    gap: 15,
  },
  buttons: {
    borderRadius: 20,
    fontWeight: 'bold',
  },
});
