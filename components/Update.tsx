import React, { useState, useEffect } from "react";
import { View, Modal, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useMyContext } from "../context/MyContext";
import axios from "axios";
import checkForm from "../functions/checkForm";
import { form,  user } from "interfaces/interfaces";
const Update = () => {
  const { list, setList, setEdit, edit } = useMyContext();
  const [form, setform] = useState<form>({
    id: null,
    name: "",
    surname: "",
    phone: null,
    address: "",
    email: "",
  });
  const [focusedOn, setfocusedOn] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [editData, setEditData] = useState<user>(null);
  
  useEffect(() => {
   
    if(edit.data){
      setEditData(edit.data)
      
      setform({
      id: editData?.id ?? null,
      name: editData?.name || "",
      surname: editData?.surname || "",
      phone: editData?.id ?? null,
      address: editData?.address || "",
      email: editData?.email || "",
    });

    }
 
    return () => {
      setform({
        id: null,
        name: "",
        surname: "",
        phone: null,
        address: "",
        email: "",
      });
    };
  }, [edit]);

  const handleEdit = async () => {
    try {
      const check = checkForm(form);

      if (!check.done) {
        setErrorMsg(check.error);
      }
      if (editData.id != form.id) {
        const checkIfExists = list.find((item) => item.id === form.id);

        if (checkIfExists) {
          setErrorMsg("ID en uso");
          return;
        }
          setisLoading(true)
        const res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/1`,
          form
        );
        setisLoading(false)

        if (res && res.status === 200 && res.data) {
          const RemoveOld = list.filter((item) => {
            return item.id != editData?.id;
          });

          RemoveOld.push(form);
          const UpdatedList = RemoveOld;

          setList(UpdatedList);
          setEdit({ ...edit, on: false });
        } else {
          setErrorMsg("Algo ha ido mal...");
        }
      } else {
        setisLoading(true)
        const res = await axios.put(
          `https://jsonplaceholder.typicode.com/users/1`,
          form
        );
        setisLoading(false)
        if (res && res.status === 200 && res.data) {
          setList((prevArray) => {
            return prevArray.map((item) => {
              if (item.id === form.id) {
                return form;
              } else {
                return item;
              }
            });
          });
          setEdit({ ...edit, on: false });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Modal
      onRequestClose={() => {
        setEdit({ ...edit, on: false });
      }}
      animationType="slide"
      transparent={true}
      visible={edit.on}
    >
      <View className="w-full flex-[1] flex-col justify-between h-[100%] relative top-[60] bg-zinc-900 rounded-2xl py-[40]  border-t border-zinc-50/50 shadow-2xl shadow-white/90">
        <TouchableOpacity
          onPress={() => setEdit({ ...edit, on: false })}
          className="absolute top-5 left-5 border p-2 rounded-md px-5 bg-indigo-500 "
        >
          <Text className="text-white font-semibold">BACK</Text>
        </TouchableOpacity>
        <View className="py-10 gap-3 px-2">
          <View className="relative">
            <TextInput
              onFocus={() => setfocusedOn("id")}
              className={`border-2 border-blue-500 ${
                focusedOn === "id" && "bg-slate-800"
              } w-full my-1 rounded-md p-2 px-7  font-semibold text-zinc-50 `}
              placeholder={`${form?.id || "id"}`}
              keyboardType="numeric"
              placeholderTextColor="#a0aeb0"
              value={form.id !== null ? form.id.toString() : ""}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setform({
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
              onFocus={() => setfocusedOn("name")}
              className={`border-2  border-blue-500 ${
                focusedOn === "name" && "bg-slate-800"
              } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
              placeholder={form?.name || "name"}
              placeholderTextColor="#a0aeb0"
              value={form.name}
              onChangeText={(text) => {
                setform({ ...form, name: text });
              }}
            />
            <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2">
              Name
            </Text>
          </View>
          <View className="relative">
            <TextInput
              onFocus={() => setfocusedOn("surname")}
              className={`border-2 border-blue-500 ${
                focusedOn === "surname" && "bg-slate-800"
              } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
              placeholder={form.surname || "surname"}
              placeholderTextColor="#a0aeb0"
              value={form.surname}
              onChangeText={(text) => {
                setform({ ...form, surname: text });
              }}
            />
            <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2 rounded-full">
              Surname
            </Text>
          </View>
          <View className="relative">
            <TextInput
              onFocus={() => setfocusedOn("phone")}
              className={`border-2 border-blue-500 ${
                focusedOn === "phone" && "bg-slate-800"
              } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
              placeholder={
                `${form?.phone != null ? form?.phone : "phone"}` || "phone"
              }
              keyboardType="number-pad"
              placeholderTextColor="#a0aeb0"
              value={form.phone !== null ? form.phone.toString() : ""}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9]/g, "");
                setform({
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
              onFocus={() => setfocusedOn("address")}
              className={`border-2 border-blue-500 ${
                focusedOn === "address" && "bg-slate-800"
              } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
              placeholder={form?.address || "address"}
              placeholderTextColor="#a0aeb0"
              value={form.address}
              onChangeText={(text) => {
                setform({ ...form, address: text });
              }}
            />
            <Text className="text-zinc-50 absolute top-[-3] left-5 bg-zinc-900 px-2 rounded-full">
              address
            </Text>
          </View>
          <View className="relative">
            <TextInput
              onFocus={() => setfocusedOn("email")}
              className={`border-2 border-blue-500 ${
                focusedOn === "email" && "bg-slate-800"
              } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
              placeholder={form?.email || "email"}
              keyboardType="email-address"
              placeholderTextColor="#a0aeb0"
              value={form.email}
              onChangeText={(text) => {
                setform({ ...form, email: text });
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
        <View className="pb-10">
          <TouchableOpacity className="flex flex-row justify-center  gap-x-2 bg-indigo-500 rounded-md p-2 py-4  text-center text-md border text-white font-semibold" onPress={handleEdit}>
            <Text className="text-zinc-50 font-semibold">
              Save Changes
            </Text>
            {isLoading && <ActivityIndicator size="small" color="#ffffff" />}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Update;
