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
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../App";
import { addDoc, collection } from "firebase/firestore";

const genderOptions = ["Male", "Female"];

export default function SignUP({ navigation }) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user.uid);
        addDoc(collection(db, "user"), {
          uid: user.uid,
          email: email,
          name: name,
          age: age,
          gender: gender,
        });
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        // ..
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
      <View style={{ paddingHorizontal: 16, paddingTop: 30 }}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Full Name"
          onChangeText={(text) => setName(text)}
          autoCapitalize="words"
        />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />
        <Text style={{ marginTop: 10, marginBottom: 20 }}>Select Gender</Text>
        {genderOptions.map((option, index) => {
          const selected = option === gender;
          return (
            <Pressable
              onPress={() => setGender(option)}
              key={option}
              style={styles.radioCotainer}
            >
              <View
                style={[
                  styles.outerCircle,
                  selected && styles.selectOuterCircle,
                ]}
              >
                <View style={[selected && styles.selectInnerCircle]}></View>
              </View>
              <Text>{option}</Text>
            </Pressable>
          );
        })}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          title="Signup"
          customStyle={{ alignSelf: "center", marginBottom: 60 }}
          onPress={handlePress}
        />

        <Pressable onPress={() => navigation.navigate("SignIn")}>
          <Text style={{ paddingBottom: 40, fontWeight: "bold" }}>
            Already Have an account?{" "}
            <Text style={{ color: "green" }}>Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radioCotainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "orange",
  },
});
