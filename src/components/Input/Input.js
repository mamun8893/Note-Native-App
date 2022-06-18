import { TextInput, StyleSheet } from "react-native";
import React from "react";

export default function Input({
  placeholder,
  secureTextEntry,
  onChangeText,
  autoCapitalize,
  multiline,
  value,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
      onChangeText={onChangeText}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
});
