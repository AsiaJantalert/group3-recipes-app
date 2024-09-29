import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import WelcomeScreen from './src/screens/WelcomeScreen'
import RecipeDetailScreen from './src/screens/RecipeDetailScreen'
import FavoriteScreen from './src/screens/FavoriteScreen'
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid} from 'react-native-heroicons/solid'
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline} from 'react-native-heroicons/outline'
import { View } from 'react-native'
import SearchScreen from './src/screens/SearchScreen'
import { FavoritesProvider } from './src/components/favoritescontext'
import CookingScreen from './src/screens/CookingScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() 
{
    return(
      <FavoritesProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false, contentStyle: {backgroundColor: 'white'}}}>
                <Stack.Screen name='Home' component={BottomTabs} />
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                <Stack.Screen name='RecipeDetail' component={RecipeDetailScreen} />
                <Stack.Screen name='Search' component={SearchScreen} />
                <Stack.Screen name='Cooking' component={CookingScreen} />
            </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    )
}

function BottomTabs() {
  return (
        <Tab.Navigator screenOptions={({route})=>({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size})=> menuIcons(route, focused),
          tabBarStyle: {
            backgroundColor: '#ef4444',
            elevation: 5
          },
          tabBarItemStyle: {
            marginTop: 30
          }
        })}>
            <Tab.Screen name='home' component={HomeScreen} />
            <Tab.Screen name='favourite' component={FavoriteScreen} />
        </Tab.Navigator>
  )
}

const menuIcons = (route, focused)=>{
  let icon;
  if(route.name=='home') {
    icon = focused? <HomeSolid size="30" color="#ef4444" />: <HomeOutline size="30" strokeWidth={2} color="white"/>
  }else if(route.name=='favourite') {
    icon = focused? <HeartSolid size="30" color="#ef4444" />: <HeartOutline size="30" strokeWidth={2} color="white"/>
  }
  let buttonClass = focused? 'bg-white': '';
  return (
    <View className={"flex items-center rounded-full p-3 shadow "+buttonClass}>
      {icon}
    </View>
  )
}
