import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PrimeryBtn from "../Components/ui/primeryBtn";

const StepSecond: React.FC = () => {
  const [heigth, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [active, setActive] = useState("");

  interface UserProfile {
    heigth: number;
    weight: number;
    active: string;
  }
  const router = useRouter();
  const isDisabled = !heigth.trim() || !weight.trim() || !active.trim();

  const saveData = async (): Promise<void> => {
    if (isDisabled) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      const userData: UserProfile = {
        heigth: heigth.trim() ? parseInt(heigth.trim(), 10) : 0,
        weight: weight.trim() ? parseInt(weight.trim(), 10) : 0,
        active: active.trim(),
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      router.push("/homeScreen");
    } catch (error) {
      Alert.alert("Erro", "Failed to save data");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F3FBF4]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-row items-center justify-between mt-6">
          <View>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="left" size={37} color="green" />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require("../assets/images/LoqoRow.png")}
              style={{ width: 170, height: 90, alignSelf: "center" }}
            />
          </View>
        </View>

        {/* Bu hissə əsas contentdir */}
        <View className="bg-white flex-1 rounded-t-3xl pb-10 pt-10">
          <View className="w-[80%] mx-auto">
            <Text className="text-4xl font-bold">Step 2 of 2</Text>

            <View className="mt-5 gap-8">
              <View className="gap-2">
                <Text className="text-2xl">Height</Text>
                <View>
                  <TextInput
                    className="border rounded-md relative py-5 text-2xl px-4"
                    placeholder="Height"
                    value={heigth}
                    onChangeText={setHeight}
                    keyboardType="numeric"
                  />
                  <View className="absolute top-5 right-4">
                    <Text className="text-2xl text-gray-500">SM</Text>
                  </View>
                </View>
              </View>
              <View className="gap-2">
                <Text className="text-2xl">Weight</Text>
                <View>
                  <TextInput
                    className="border rounded-md relative py-5 text-2xl px-4"
                    placeholder="Weight"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                  />
                  <View className="absolute top-5 right-4">
                    <Text className="text-2xl text-gray-500">KG</Text>
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-2xl">Active</Text>
                <View className="border rounded-md">
                  <Picker
                    mode="dropdown"
                    selectedValue={active}
                    onValueChange={setActive}
                  >
                    <Picker.Item
                      label="Select Active Level"
                      value=""
                      enabled={false}
                      style={{ fontSize: 22, color: "gray" }}
                    />

                    <Picker.Item
                      label="Sendentary"
                      value="sendentary"
                      style={{ fontSize: 22, color: "gray" }}
                    />
                    <Picker.Item
                      label="Moderately active"
                      value="moderatelyActive"
                      style={{ fontSize: 22, color: "gray" }}
                    />
                    <Picker.Item
                      label="Very active"
                      value="veryActive"
                      style={{ fontSize: 22, color: "gray" }}
                    />
                  </Picker>
                </View>
              </View>
            </View>

            <View className="mt-10">
              <PrimeryBtn
                onPress={saveData}
                label="Continue to App"
                disable={isDisabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepSecond;
