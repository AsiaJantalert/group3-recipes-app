import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import Swiper from 'react-native-swiper'
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {FadeIn, FadeInDown} from 'react-native-reanimated';

export default function CookingScreen({route}) {

    const {meal} = route.params;
    const navigation = useNavigation();

    const ingredientsIndexes = (meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }
        return indexes;
    }

    const fullInstructions = meal.strInstructions;
    const instructions = fullInstructions.split('.').filter(instructions => instructions.trim() != '');
    
    return (
        <View className ="flex-1 bg-white">
            <StatusBar style="dark" />

            {/* recipe's name */}
            <Animated.View entering={FadeIn.duration(1000)} style={{paddingTop: hp(7.8)}} className="mx-6 mr-14 pr-5 mb-2">
                <View>
                        <Text style={{fontSize: hp(2.2)}} className="font-semibold text-black/30">
                            {meal.strMeal}
                        </Text>
                    <View className="bg-black/20 rounded-md p-0.5 mt-1"/>
                </View>
            </Animated.View>

            {/* x */}
            <Animated.View entering={FadeIn.duration(1000)} className="w-full absolute flex-row justify-end items-end pt-14">
                <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 mr-5">
                        <XMarkIcon size={hp(3.5)} strokeWidth={3.5} color="#d4d4d4" />
                </TouchableOpacity>  
            </Animated.View>

            {/* swipe desc */}
            <Animated.View entering={FadeIn.duration(1000)} style={{bottom: hp(7.8)}} className="w-full absolute flex-1 justify-center items-center">
                <Text style={{fontSize: hp(2)}} className="font-semibold text-black/20">
                    swipe to another step!
                </Text>  
            </Animated.View>

            <Swiper loop={false} showsButtons={false} showsPagination={false}>

                {/* recipe's ingredients */}
                <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{paddingTop: hp(1.5)}} className="mx-6 space-y-1 mb-2">
                    <View>
                        <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                            Let's preapare
                        </Text>
                    </View>
                    <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                        the <Text className="text-red-400">ingredients</Text> first
                    </Text>
                    <ScrollView style={{paddingTop: hp(2)}} className="space-y-3 ml-3 mb-5">
                        {
                            ingredientsIndexes(meal).map(i=>{
                                return (
                                    <View key={i} className="flex-row space-x-4">
                                        <View style={{height: hp(1.5), width: hp(1.5)}} className="bg-red-300 rounded-full" />
                                        <View className="flex-row space-x-2">
                                            <Text style={{fontSize: hp(2)}} className="font-extrabold text-neutral-700">{meal['strIngredient'+i]}</Text>
                                            <Text style={{fontSize: hp(2)}} className="font-extrabold text-neutral-500">{meal['strMeasure'+i]}</Text>
                                        </View>    
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </Animated.View>

                {/* recipe's instructions */}
                <Swiper loop={false} showsButtons={false} showsPagination={false}>
                {
                    instructions.map((instructions, i)=>{
                        return (
                            <View key={i}>
                                <View className="mx-6 space-y-1 mb-2">
                                <View style={{paddingTop: hp(1.5)}}>
                                    <Text style={{fontSize: hp(3.8)}} className="font-semibold text-red-400">
                                        Instructions
                                    </Text>
                                </View>
                                <View style={{paddingTop: hp(2)}} className="flex-row space-x-4 mr-5" >
                                    <View style={{height: hp(5.5), width: hp(5.5)}} className="bg-red-300 rounded-full">
                                        <Text style={{fontSize: hp(4)}} className="mt-0.5 text-center font-bold text-white">
                                            {i+1}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: hp(3)}} className="mr-8 font-semibold text-neutral-700">{instructions.trim()+'.'}</Text>
                                    </View> 
                                </View>
                                </View>
                            </View>
                        )
                    })
                }
                </Swiper>
                
                {/* finish */}
                <View style={{paddingBottom: hp(10)}} className="flex-1 justify-center items-center">
                    <Text style={{fontSize: hp(5)}} className="font-bold text-red-400">
                        Finish
                    </Text>
                    <Text style={{fontSize: hp(5)}} className="font-bold text-red-400">
                        Cooking!
                    </Text>
                </View>

            </Swiper>
            
        
        </View>
    )
}
