import { View, Text, ScrollView, TextInput, TouchableOpacity, Pressable, Image } from "react-native";
import React, { useState } from "react";
import Animated, {FadeIn, FadeInDown} from "react-native-reanimated";
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MagnifyingGlassIcon, ChevronLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import SearchResult from "../components/searchresult";


export default function SearchScreen() {

    const navigation = useNavigation();

    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchRecipes = async ()=>{
        try{
            if(query!=''){
                const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`);
                //console.log('got meal data: ',response.data);
                if(response && response.data){
                    setMeals(response.data.meals);
                    setLoading(false); 
                }
            }else {setLoading(true);}
        }catch(err){
            console.log('error: ',err.message);
        }
    }

    return (
        <View className ="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className="space-y-6 pt-14">

                {/* back and desc */}
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{paddingTop: hp(2.5)}} className="mx-5 space-y-1 mb-2">
                    <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full flex-row">
                        <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full mb-2 bg-red-400">
                            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="white" />
                        </TouchableOpacity>
                    </Animated.View>
                    <View>
                        <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                            Search recipes,
                        </Text>
                    </View>
                    <Text style={{fontSize: hp(3.3)}} className="font-semibold text-neutral-600">
                        find what you're <Text className="text-red-400">looking</Text> for
                    </Text>
                </Animated.View>

                {/* search bar */}
                <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
                    <TextInput
                    placeholder='search any recipe by name...'
                    placeholderTextColor={'gray'}
                    style={{fontSize: hp(1.7)}}
                    className="flex-1 text-base mb-1 pl-3 tracking-wider"
                    value={query}
                    onSubmitEditing={searchRecipes}
                    onChangeText={(text)=>setQuery(text)}
                    />
                    <Pressable className="bg-red-500 rounded-full p-3" onPress={searchRecipes}>
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="white" />
                    </Pressable>
                </Animated.View>

                {/* search result */}
                <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}>
                    <SearchResult loading={loading} meals={meals} />
                </Animated.View>
                
            </ScrollView>
        </View>
    )
}