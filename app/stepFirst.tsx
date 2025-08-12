import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import PrimeryBtn from "../Components/ui/primeryBtn";

const StepFirst: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  interface UserProfile {
    fullName: string;
    gender: string;
    age: number;
  }
  const router = useRouter();

  const isDisabled = !fullName.trim() || !gender.trim() || !age.trim();
  const saveData = async (): Promise<void> => {
    if(isDisabled){
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    try {
      const userData: UserProfile = {
        fullName: fullName.trim(),
        gender,
        age: age.trim() ? parseInt(age.trim(),10):0,
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      router.push("/stepSecond");
    } catch (error) {
      Alert.alert(" Error", "Failed to save data");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#F3FBF4]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image
          source={require("../assets/images/LoqoRow.png")}
          style={{ width: 170, height: 90, alignSelf: "center", marginTop: 20 }}
        />
        {/* Bu hissə əsas contentdir */}
        <View className="bg-white flex-1 rounded-t-3xl pb-10 pt-10">
          <View className="w-[80%] mx-auto">
            <Text className="text-4xl font-bold">Step 1 of 2</Text>

            <View className="mt-5 gap-8">
              <View className="gap-2">
                <Text className="text-2xl">Full Name</Text>
                <TextInput
                  className="border rounded-md py-5 text-2xl px-4"
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>

              <View className="gap-2">
                <Text className="text-2xl">Gender</Text>
                <View className="border rounded-md">
                  <Picker
                    mode="dropdown"
                    selectedValue={gender}
                    onValueChange={setGender}
                  >
                    <Picker.Item
                      label="Select Gender"
                      value=""
                      enabled={false}
                      style={{ fontSize: 22, color: "gray" }}
                    />

                    <Picker.Item
                      label="Male"
                      value="male"
                      style={{ fontSize: 22, color: "gray" }}
                    />
                    <Picker.Item
                      label="Female"
                      value="female"
                      style={{ fontSize: 22, color: "gray" }}
                    />
                    <Picker.Item
                      label="Other"
                      value="other"
                      style={{ fontSize: 22, color: "gray" }}
                    />
                  </Picker>
                </View>
              </View>

              <View className="gap-2">
                <Text className="text-2xl">Age</Text>
                <TextInput
                  className="border rounded-md py-5 text-2xl px-4"
                  placeholder="Age"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View className="mt-10">
              <PrimeryBtn
                onPress={saveData}
                label="Next"
                disable={isDisabled}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default StepFirst;
