import { StatusBar } from 'expo-status-bar';
import {  Text, View,ScrollView,Image } from 'react-native';
import { Redirect,router } from 'expo-router';
import {images} from "../constants"
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';
export default function App() {

  const {Loading, isLoggedIn} = useGlobalContext();
  
  if(!Loading && isLoggedIn) return <Redirect href="/home" />;

  return (
    <SafeAreaView  className="bg-primary h-full" >

      <ScrollView contentContainerStyle={{
          height:'100%'
        }}>
        <View className="w-full min-h-[85vh] flex justify-center items-center  px-6">
          
          <Image
          source={images.logo}
          className="w-[130px] h-[84px]"
          resizeMode="contain"
          />

          <Image
          source={images.cards}
          className="max-w-[380px] h-[300px]"
          resizeMode="contain"
          />

          <View clasName="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{'\n'} Possibilities With {' '}
              <Text className="text-secondary-200">
                Aora
              </Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode='contain'
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-6 text-center">
          Where Creativity Meets Innovation: Embark on a Journey of Limitless
          Exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={()=>router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />

        </View>

      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}


