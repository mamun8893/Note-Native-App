import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require("../../assets/login.png")}
        style={{ alignSelf: "center" }}
      />
      <Text
        style={{
          textAlign: "center",
          fontWeight: "500",
          fontSize: 18,
          marginTop: 10,
        }}
      >
        Never Forget your notes
      </Text>
      <View style={{ paddingHorizontal: 16, paddingTop: 30 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          title="Login"
          customStyle={{ alignSelf: "center", marginBottom: 60 }}
          onPress={handlePress}
        />

        <Pressable onPress={() => navigation.navigate("SignUp")}>
          <Text style={{ paddingBottom: 40, fontWeight: "bold" }}>
            Don't Have an Account?{" "}
            <Text style={{ color: "green" }}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
