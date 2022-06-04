import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

export default function SignIn({ navigation }) {
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
        <Input placeholder="Email Address" />
        <Input placeholder="Password" secureTextEntry />
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
