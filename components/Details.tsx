import React, { useState, useEffect } from "react";
import {
  View,
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { useMyContext } from "../context/MyContext";
import axios from "axios";

interface UserDetails {
  id: number;
  name: string;
  surname: string;
  phone: number;
  email: string;
  address: string;
}

const Details: React.FC = () => {
  const { details, setDetails, list, setList, edit, setEdit } = useMyContext();
  const [detailsData, setdetailsData] = useState<UserDetails | null>(null);

  useEffect(() => {
    setdetailsData(details.data);
    setEdit({ ...edit, data: details.data });
    return () => {
      setdetailsData(null);
    };
  }, [details]);

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      if (res && res.status === 200) {
        console.log(res.data, res.status);
        const newList = list.filter((item) => item.id !== id);
        setList(newList);
        setDetails({ ...details, on: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      onRequestClose={() => {
        setDetails({ ...details, on: false });
      }}
      animationType="slide"
      transparent={true}
      visible={details.on}
    >
      <View className=" shadow-inner flex-[1] relative items-center justify-center min-h-[900] w-full h-full  top-[60] bottom-[50]  pb-10 ">
        <View className="w-full flex-[1] flex-col justify-between h-[100%] relative top-0 bg-zinc-900 rounded-2xl py-[40] border-t border-zinc-50/50 shadow-2xl shadow-white/90">
          <TouchableHighlight
            onPress={() => setDetails({ ...details, on: false })}
            className="absolute top-5 left-5 border p-2 rounded-md px-5 bg-indigo-500 "
          >
            <Text className="text-white font-semibold">BACK</Text>
          </TouchableHighlight>
          <View className="  flex-[1] p-5 flex-col gap-2 justify-center">
            <Text className="font-semibold text-white text-lg">ID</Text>
            <Text className=" text-white  text-lg ">{detailsData?.id}</Text>
            <Text className="font-semibold text-white  text-lg">
              Name and Surname
            </Text>
            <Text className=" text-white text-lg">
              {detailsData?.name} {detailsData?.surname}
            </Text>
            <Text className="font-semibold text-white  text-xl ">Phone</Text>
            <Text className=" text-white  text-lg">{detailsData?.phone}</Text>
            <Text className="font-semibold text-white  text-lg">Address</Text>
            <Text className=" text-white text-lg">
              {detailsData?.address || "No address provided"}
            </Text>
            <Text className="font-semibold text-white  text-lg">
              Email address
            </Text>
            <Text className=" text-white text-lg">{detailsData?.email}</Text>
          </View>
          <View className="py-10 gap-3">
            <TouchableOpacity
              onPress={() => {
                setDetails({ ...details, on: false });
                setEdit({ ...edit, on: true, data: detailsData });
              }}
            >
              <Text className="bg-amber-500 rounded-md p-2 py-3  text-center text-md border text-white font-semibold">
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(detailsData?.id!)}>
              <Text className="bg-red-500 rounded-md p-2 py-3  text-center text-md border text-white font-semibold">
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Details;
