import { View, Text, ScrollView, TextInput, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import axios from 'axios'
import Categories from '../components/categories'
import Recipes from '../components/recipes'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

    const navigation = useNavigation();

    const [activeCategory, setActivecategory] = useState('Beef');
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(()=>{
        getCategories();
        getRecipes();
    },[])

    const handleChangeCategory = category=>{
        getRecipes(category);
        setActivecategory(category);
        setMeals([]);
    }

    const getCategories = async ()=>{
        try{
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            //console.log('got categories: ',response.data);
            if(response && response.data){
                setCategories(response.data.categories);
            }
        }catch(err){
            console.log('error: ',err.message);
        }
    }

    const getRecipes = async (category="Beef")=>{
        try{
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            //console.log('got recipes: ',response.data);
            if(response && response.data){
                setMeals(response.data.meals); 
            }
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

                {/* greetings */}
                <View style={{paddingTop: hp(2.5)}} className="mx-5 space-y-1 mb-2">
                    <Text style={{fontSize: hp(1.7)}} className="text-neutral-600">
                        Welcome to TastyBits!
                    </Text>
                    <View>
                        <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                            Let's create <Text className="text-red-400">tasty</Text>
                        </Text>
                    </View>
                    <Text style={{fontSize: hp(3.8)}} className="font-semibold text-red-400">
                        recipes <Text className="text-neutral-600">together</Text>
                    </Text>
                </View>

                {/* search */}
                <Pressable 
                className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]"
                onPress={()=> navigation.navigate('Search')}>
                    <Text
                    style={{fontSize: hp(1.7)}}
                    className="flex-1 text-base pl-4 tracking-wider text-gray-400">
                        search any recipe...
                    </Text>
                    <View className="bg-red-500 rounded-full p-3">
                        <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="white" />
                    </View>
                </Pressable>

                {/* categories */}
                <View>
                    { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
                </View>

                {/* recipes */}
                <View>
                    <Recipes meals={meals} categories={categories} />
                </View>
            </ScrollView>
        </View>
    )
}