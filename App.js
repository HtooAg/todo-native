import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";

const styles = StyleSheet.create({
  container: {
    // width: 360,
  },
  header: {
    backgroundColor: "#2196F3",
    padding: 20,
    // paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    backgroundColor: "#9bcff7",
    padding: 20,
    flexDirection: "row",
  },
  input: {
    flexGrow: 1,
    fontSize: 18,
  },
  ListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { _id: 1, subject: "Apple", done: false },
    { _id: 2, subject: "Orange", done: false },
    { _id: 3, subject: "Milk", done: true },
    { _id: 4, subject: "Bread", done: false },
  ]);

  const [text, setText] = useState("");
  const inputRef = useRef();

  const addTask = () => {
    if (!text) return false;
    setTasks([
      ...tasks,
      {
        _id: tasks[tasks.length - 1]._id + 1,
        subject: text,
        done: false,
      },
    ]);
    setText("");
    inputRef.current.focus();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo</Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          ref={inputRef}
          placeholder="+ New Task"
          placeholderTextColor="#888"
          onChangeText={setText}
          value={text}
          onSubmitEditing={() => addTask()}
        />
        <Button title="ADD" onPress={() => addTask()} />
      </View>
      <View style={{ padding: 20 }}>
        {tasks.map(item => {
          return (
            <View style={styles.ListItem} key={item._id}>
              <Text style={{ fontSize: 18 }}>{item.subject}</Text>
              <TouchableOpacity
                onPress={() => {
                  setTasks(tasks.filter(task => task._id !== item._id));
                }}>
                <Text style={{ color: "brown" }}>Del</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
