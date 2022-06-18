import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { async } from "@firebase/util";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../App";
import { useNavigation } from "@react-navigation/native";

const noteOptions = ["red", "blue", "green"];

export default function Create({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noteColor, setNoteColor] = useState("blue");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onPressCreate = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        title: title,
        description: description,
        noteColor: noteColor,
        uid: user.uid,
      });
      setLoading(false);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={{ paddingHorizontal: 20 }}>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />
        <View style={{ marginBottom: 20 }}>
          <Text>Select Note Color</Text>
        </View>
        {noteOptions.map((option, index) => {
          const selected = option === noteColor;
          return (
            <Pressable
              onPress={() => setNoteColor(option)}
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

        {loading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <Button
            title="Create Note"
            customStyle={{ alignSelf: "center", width: "100%", marginTop: 20 }}
            onPress={onPressCreate}
          />
        )}
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
