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
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../App";
import { useNavigation } from "@react-navigation/native";

const noteOptions = ["red", "blue", "green"];

export default function Create({ user, route }) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.noteColor);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const onPressUpdate = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", noteItem.id), {
        title: title,
        description: description,
        noteColor: noteColor,
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
        <Input
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          value={description}
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
            title="Update Note"
            customStyle={{ alignSelf: "center", width: "100%", marginTop: 20 }}
            onPress={onPressUpdate}
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
