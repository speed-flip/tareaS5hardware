import { Entypo } from '@expo/vector-icons';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ text, onPress, icon, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={28} color={color ? color : '#F1F1F1'} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#F1F1F1',
    marginLeft: 10,
  }
})