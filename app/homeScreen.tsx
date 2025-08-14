import React from 'react'
import { Text, View } from 'react-native'

const HomeScreen = () => {
  return (
    <View className='bg-[#F3FBF4] flex-1 '>
      <View className='items-center justify-center flex-1'>
        <View className='bg-white p-40 border-4 border-[#2f9456] rounded-full border-dashed'>
            
        </View>
        <Text className='text-2xl font-bold text-green-600'>Welcome to Home Screen</Text>
      </View>
    </View>
  )
}

export default HomeScreen