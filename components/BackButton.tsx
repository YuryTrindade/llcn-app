import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { colors } from 'utils/colors';

export const BackButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.backButton}>
      <Feather name="chevron-left" size={43} color={colors.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
  },
});
