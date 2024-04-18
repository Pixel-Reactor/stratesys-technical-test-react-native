import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useMyContext } from "../context/MyContext";
import { Keyboard } from "react-native";
import axios from "axios";
const Search = () => {
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const [itemFound, setItemFound] = useState<any | null>(null);
  const { list, details, setDetails } = useMyContext();
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setloading] = useState(false);

  const HandleSearch = async () => {
    try {
      setloading(true);
      setNotFound(false);
      const res = await axios.get(
        `https://my-json-server.typicode.com/Pixel-Reactor/jsondb/users/1`
      );

      // As the response data is not updated, the search will be in the local list
      
      const itemFound = list?.filter((item) => item.id === searchValue) ?? null;

      if (itemFound && itemFound.length) {
        setItemFound(itemFound[0]);
      } else {
        setNotFound(true);
        setItemFound(null);
      }
      setloading(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="flex-[1] bg-zinc-900 py-5 flex-col justify-between">
      <TextInput
        keyboardType="numeric"
        className={`border-2  border-blue-500 
              } w-full my-1 rounded-md p-2 px-7 font-semibold text-zinc-50 `}
        placeholder={"Insert an ID to find"}
        placeholderTextColor="#a0aeb0"
        autoFocus={true}
        onSubmitEditing={() => HandleSearch}
        value={searchValue !== null ? searchValue.toString() : ""}
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, "");
          setSearchValue(numericValue !== "" ? parseInt(numericValue) : null);
        }}
      />
      <View className="pb-10 flex-1 items-center justify-center">
        {itemFound && (
          <TouchableOpacity
            className="w-[300] h-[250] py-2 flex flex-col  items-center bg-slate-800
            rounded-md shadow-lg shadow-white border-2 border-indigo-500/50 "
          >
            <View className="flex-[1] flex-col items-start justify-between p-3 gap-2  w-full">
              <Text className="font-semibold text-white  bg-indigo-500 rounded-full px-3 py-1 text-center">
                {itemFound?.id}
              </Text>
              <Text className="font-semibold text-white">
                {itemFound?.name} {itemFound?.surname}
              </Text>

              <Text className="font-semibold text-white">
                {itemFound?.phone}
              </Text>

              <Text className="font-semibold text-white">
                {itemFound?.address}
              </Text>

              <Text className="font-semibold text-white">
                {itemFound?.email}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setDetails({ ...details, on: true, data: itemFound })
              }
              className="border w-[90%] border-indigo-600/50 p-2  rounded-md bg-indigo-600/90 "
            >
              <Text className="font-semibold text-zinc-50 text-center ">
                DETAILS
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        {loading && (
          <Text className="bg-indigo-500 p-2 py-4 rounded-full text-center text-md border text-white font-semibold">
            Loading...
          </Text>
        )}
        {notFound && (
          <Text className="text-zinc-50 font-semibold"> No user found</Text>
        )}
      </View>

      <TouchableOpacity onPress={HandleSearch}>
        <Text className="bg-indigo-500 rounded-md p-2 py-4  text-center text-md border text-white font-semibold">
          Search
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search;
