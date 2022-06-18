import { View, Text, SafeAreaView, Pressable, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { db } from "../../App";

const renderItem = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: item.noteColor,
        borderRadius: 16,
        padding: 15,
        marginBottom: 10,
      }}
    >
      <Text style={{ fontSize: 22, color: "#fff", marginBottom: 5 }}>
        {item.title}
      </Text>
      <Text style={{ fontSize: 18, color: "#fff" }}>{item.description}</Text>
    </View>
  );
};

export default function Home({ user }) {
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  const onPressCreate = () => {
    navigation.navigate("Create");
  };

  useEffect(() => {
    const q = query(collection(db, "notes"), where("uid", "==", user.uid));
    const notesSubscription = onSnapshot(q, (QuerySnapshot) => {
      const list = [];
      QuerySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setNotes(list);
    });
    return notesSubscription;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text>My Notes</Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}
