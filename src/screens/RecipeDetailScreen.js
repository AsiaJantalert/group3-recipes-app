import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { FavoritesContext } from '../components/favoritescontext';

export default function RecipeDetailScreen(props) {

    let item = props.route.params;

    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [instructions, setInstructions] = useState([]);
    const {favorites, setFavorites} = useContext(FavoritesContext);

    useEffect(()=>{
        getMealData(item.idMeal);
    },[])

    const getMealData = async (id)=>{
        try{
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            //console.log('got meal data: ',response.data);
            if(response && response.data){
                setMeal(response.data.meals[0]);
                setLoading(false); 

                const fullInstructions = response.data.meals[0].strInstructions;
                const splitInstructions = fullInstructions.split('.').filter(instructions => instructions.trim() != '');

                setInstructions(splitInstructions);
            }
        }catch(err){
            console.log('error: ',err.message);
        }
    }

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

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1]
        }
        return null;
    }

    const addToFavorites = (item) =>{
        if(favorites.find(fav => fav.idMeal == item.idMeal)){
            setFavorites(prevFavorites => prevFavorites.filter(fav => fav.idMeal !== item.idMeal));
        } else {
            setFavorites(prevFavorites => [...prevFavorites, item]);
        }
    }


    return (
        <View className ="flex-1 bg-white">
        <ScrollView
        className="bg-white flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 30}}>
            <StatusBar style={"light"}/>

            {/* recipe's image */}
            <View className="flex-row justify-center">
                <Image
                source={{uri: item.strMealThumb}}
                style={{width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4}}/>
            </View>

            {/* back and favourite*/}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity onPress={()=> navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#f87171" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> addToFavorites(item)} className="p-2 rounded-full mr-5 bg-white">
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={favorites.some(fav => fav.idMeal == item.idMeal)? "#b91c1c": "gray"} />
                </TouchableOpacity>
            </Animated.View>

            {/* recipe's description */}
            {
                loading? (
                    <Loading size="large" className="mt-16" />
                ): (
                    <View className="px-4 flex justify-between space-y-4 pt-5">

                        {/* recipe's name, category and nation */}
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{fontSize: hp(3)}} className="font-bold flex-1 text-neutral-700">
                                {meal?.strMeal}
                            </Text>
                            <Text style={{fontSize: hp(2)}} className="font-bold flex-1 text-neutral-500">
                                {meal?.strCategory}, <Text className="text-red-500">{meal?.strArea}</Text>
                            </Text>
                            <View className="bg-black/20 rounded-md p-0.5"/>
                        </Animated.View>

                        {/* recipe's ingredients */}
                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} className="space-y-4">
                            <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                Ingredients
                            </Text>
                            <View className="space-y-3 ml-3">
                                {
                                    ingredientsIndexes(meal).map(i=>{
                                        return (
                                            <View key={i} className="flex-row space-x-4">
                                                <View style={{height: hp(1.5), width: hp(1.5)}} className="bg-red-300 rounded-full" />
                                                <View className="flex-row space-x-2">
                                                    <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strIngredient'+i]}</Text>
                                                    <Text style={{fontSize: hp(1.7)}} className="font-extrabold text-neutral-500">{meal['strMeasure'+i]}</Text>
                                                </View>    
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>

                        {/* recipe's instructions */}
                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} className="mr-5 space-y-4">
                            <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                Instructions
                            </Text>
                            <View className="space-y-3 ml-3">
                                {
                                    instructions.map((instructions, i)=>{
                                        return (
                                            <View key={i} className="flex-row space-x-4">
                                                <View style={{height: hp(2.5), width: hp(2.5)}} className="bg-red-300 rounded-full">
                                                    <Text className="mt-0.5 text-center font-bold text-white">
                                                        {i+1}
                                                    </Text>
                                                </View>
                                                <View className="flex-row space-x-2">
                                                    <Text style={{fontSize: hp(1.7)}} className="font-semibold text-neutral-700">{instructions.trim()+'.'}</Text>
                                                </View>    
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </Animated.View>

                        {/* recipe's video */}
                        {
                            meal.strYoutube &&
                                <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} className="space-y-4">
                                    <Text style={{fontSize: hp(2.5)}} className="font-bold flex-1 text-neutral-700">
                                        Cooking Video
                                    </Text>
                                    <View>
                                        <YoutubeIframe
                                            videoId={getYoutubeVideoId(meal.strYoutube)}
                                            height={hp(30)} />
                                    </View>
                                </Animated.View>
                        }

                    </View>
                )
            }
        </ScrollView>
        
            {/* cooking */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)}>
                <TouchableOpacity onPress={() => navigation.navigate('Cooking', {meal: meal})} className="mx-3 mb-4 flex-row items-center rounded-full bg-red-400 p-[12px]">
                    <Text style={{fontSize: hp(2)}}
                    className="flex-1 text-center font-bold tracking-wider text-white">
                        Let's cooking!
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}