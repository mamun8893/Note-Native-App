import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Button({ title, onPress, customStyle }) {
  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: 165,
    backgroundColor: "#ffE600",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  title: {
    fontSize: 16,
  },
});
