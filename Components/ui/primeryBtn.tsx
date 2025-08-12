import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PrimeryBtnProps{
  onPress:() => void;
  label?:string;
  disable?:boolean
}

const PrimeryBtn : React.FC <PrimeryBtnProps> = ({onPress,label,disable}) => {
  return (
    <View className='mt-52'>
      <TouchableOpacity
       onPress={onPress} className={` py-5 
      rounded-xl items-center justify-center
      ${disable ? "bg-[#F3FBF4]" : "bg-[#2f9456]"}`}>
        <Text className='text-[#fff] font-semibold text-3xl'>{label}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default PrimeryBtn