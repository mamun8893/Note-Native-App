import { TextInput, StyleSheet } from "react-native";
import React from "react";

export default function Input({ placeholder, secureTextEntry }) {
  return (
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.input}
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
