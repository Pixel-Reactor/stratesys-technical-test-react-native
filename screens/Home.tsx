import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useMyContext } from "../context/MyContext";
import { list } from 'interfaces/interfaces';
interface UserData {
  id: number;
  name: string;
  surname: string;
  phone: number;
}

export default function Home() {
  const [data, setData] = useState<UserData[] | null>(null);
  const { details, setDetails, setList, list } = useMyContext();

  const getData = async () => {
    try {
      const res = await axios.get<list[]>('https://my-json-server.typicode.com/Pixel-Reactor/jsondb/users');

      if (res && res.data) {
        setList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <ScrollView className='bg-zinc-900'>
        <View className='flex-[1] flex-row flex-wrap py-5 items-center px-2 gap-2 justify-start'>
          {list?.map((item) => (
            <TouchableOpacity
              key={item.id}
              className='w-[200] h-[200] py-2 flex flex-col justify-between items-center bg-slate-800
                rounded-md shadow-lg shadow-white border-2 border-indigo-500/50'
            >
              <View className='flex-[1] flex-col items-start justify-between p-3 gap-2 w-full'>
                <Text className='font-semibold text-white bg-indigo-500 rounded-full px-3 py-1 text-center'>
                  id {item.id}
                </Text>
                <Text className='font-semibold text-white'>{item.name} {item.surname}</Text>
                <Text className='font-semibold text-white'>{item.phone}</Text>
              </View>
              <TouchableOpacity
                onPress={() => setDetails({ ...details, on: true, data: item })}
                className='border w-[90%] border-indigo-600/50 p-2 rounded-md bg-indigo-600/90'
              >
                <Text className='font-semibold text-zinc-50 text-center'>DETAILS</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )) ?? <Text className='py-20 text-zinc-50 text-lg'>There's no data to show...</Text>}
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </>
  );
}
