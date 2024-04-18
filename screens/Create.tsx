import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useMyContext } from "../context/MyContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import checkForm from "../functions/checkForm";
import React from "react";
type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Search: undefined;
};
export default function Create() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { list, setList } = useMyContext();

  const [form, setForm] = useState<{
    id: number | null;
    name: string;
    surname: string;
    phone: number | null;
    address: string;
    email: string;
  }>({
    id: null,
    name: "",
    surname: "",
    phone: null,
    address: "",
    email: "",
  });
  const [focusedOn, setFocusedOn] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = async () => {
    try {
      const check = checkForm(form);
      if (!check.done) {
        setErrorMsg(check.error);
        return;
      }

      const checkId = list.find((item) => item.id === form.id);
      if (checkId) {
        setErrorMsg("ID en uso, por favor utilice otro");
        return;
      }

      setIsLoading(true);
      const res = await axios.post(
        "https://my-json-server.typicode.com/Pixel-Reactor/jsondb/users",
        form
      );
      setIsLoading(false);

      if (res && res.data) {
        setList((prevList) => [...prevList, res.data]);
        navigation.navigate("Home");
      } else {
        setErrorMsg("Something went wrong...");
      }
    } catch (error) {
      setErrorMsg("Something went wrong...");
    }
  };

  return (
    <View className="flex-[1] flex-col justify-between bg-zinc-900 p-2">
      <View className="py-10 gap-3">
        <View className="relative">
          <TextInput
            onFocus={() => setFocusedOn("id")}
            className={`border-2 border-blue-500 ${
              focusedOn === "id" && "bg-slate-800"
            } w-full my-1 rounded-md p-2 px-7  font-semibold text-zinc-50 `}
            placeholder={"ID ex. 123"}
            keyboardType="number-pad"
            placeholderTextColor="#a0aeb0"
            value={form.id !== null ? form.id.toString() : ""}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setForm({
                ...form,
                id: numericValue !== "" ? parseInt(numericValue) : null,
              });

              setErrorMsg("");
            }}
          />
          <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2">
            ID
          </Text>
        </View>
        <View>
          <TextInput
            onFocus={() => setFocusedOn("name")}
            className={`border-2  border-blue-500 ${
              focusedOn === "name" && "bg-slate-800"
            } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
            placeholder={"names"}
            placeholderTextColor="#a0aeb0"
            value={form.name}
            onChangeText={(text) => {
              setForm({ ...form, name: text });
            }}
          />
          <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2">
            Name
          </Text>
        </View>
        <View className="relative">
          <TextInput
            onFocus={() => setFocusedOn("surname")}
            className={`border-2 border-blue-500 ${
              focusedOn === "surname" && "bg-slate-800"
            } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
            placeholder={"surname"}
            placeholderTextColor="#a0aeb0"
            value={form.surname}
            onChangeText={(text) => {
              setForm({ ...form, surname: text });
            }}
          />
          <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2 rounded-full">
            Surname
          </Text>
        </View>
        <View className="relative">
          <TextInput
            onFocus={() => setFocusedOn("phone")}
            className={`border-2 border-blue-500 ${
              focusedOn === "phone" && "bg-slate-800"
            } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
            placeholder={"phone"}
            keyboardType="number-pad"
            placeholderTextColor="#a0aeb0"
            value={form.phone !== null ? form.phone.toString() : ""}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              setForm({
                ...form,
                phone: numericValue !== "" ? parseInt(numericValue) : null,
              });

              setErrorMsg("");
            }}
          />
          <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2 rounded-full">
            phone
          </Text>
        </View>
        <View className="relative">
          <TextInput
            onFocus={() => setFocusedOn("address")}
            className={`border-2 border-blue-500 ${
              focusedOn === "address" && "bg-slate-800"
            } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
            placeholder={"address"}
            placeholderTextColor="#a0aeb0"
            value={form.address}
            onChangeText={(text) => {
              setForm({ ...form, address: text });
            }}
          />
          <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2 rounded-full">
            address
          </Text>
        </View>
        <View className="relative">
          <TextInput
            onFocus={() => setFocusedOn("email")}
            className={`border-2 border-blue-500 ${
              focusedOn === "email" && "bg-slate-800"
            } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
            placeholder={"email"}
            keyboardType="email-address"
            placeholderTextColor="#a0aeb0"
            value={form.email}
            onChangeText={(text) => {
              setForm({ ...form, email: text });
            }}
          />
          <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2 rounded-full">
            Email
          </Text>
        </View>
      </View>
      <View>
        {errorMsg && (
          <Text
            className={` text-amber-500 p-5 border bg-slate-700 rounded-md font-semibold`}
          >
            {errorMsg}
          </Text>
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit} className="py-10 gap-3">
        <View className="bg-indigo-500 rounded-md p-2 py-3  text-md border flex-row  justify-center items-center">
          <Text className=" text-white font-semibold mr-4">Create</Text>
          {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
        </View>
      </TouchableOpacity>

      <StatusBar style="light" />
    </View>
  );
}
