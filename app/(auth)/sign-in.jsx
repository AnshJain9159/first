import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import {images} from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { Link, router } from 'expo-router'
import { Alert } from 'react-native'
import { getCurrentUser, signIn } from "../../lib/appwrite";
import {useGlobalContext} from "../../context/GlobalProvider"

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const[isSubmitting, setIsSubmitting] = useState(false)
  
  const[form,setForm]=useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if(!form.email ||!form.password){
      Alert.alert('Error', 'Please fill all the fields')
      return;
    }
    
    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      //console.log(result); 
      Alert.alert("Success", "User signed in successfully"); 
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message)
    }finally{
      setIsSubmitting(false);
    }
     
  }
  return (
    <SafeAreaView className="bg-primary w-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[100vh] px-4 my-6">
          
          <Image
          source={images.logo}
          resizeMode='contain'
          className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
          
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={
            (e)=>setForm({...form, email: e})
          }
          otherStyles="mt-7"
          keyboardType="email-address"
          />

          <FormField
          title="Password"
          value={form.password}
          handleChangeText={
            (e)=>setForm({...form, password: e})
          }
          otherStyles="mt-7"
          secureTextEntry
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className='gap-2 justify-center pt-5 flex-row'>
          <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn