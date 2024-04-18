import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import React from "react";
const AddButton = () => {

  const navigation = useNavigation(); 
  return (
    <TouchableHighlight 
    onPress={()=>navigation.navigate('Create')}
    className="bg-green-600 px-5 py-1.5 mr-5 rounded-md">
      <Text className='font-semibold text-zinc-50 '>
         <AntDesign name="adduser" size={20} color="white" />
         NEW
      </Text>
    </TouchableHighlight>
  );
};

export default AddButton;
