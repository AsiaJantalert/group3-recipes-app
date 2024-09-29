import { View, Text, ScrollView } from "react-native";
import React, {useContext} from "react";
import { StatusBar } from "expo-status-bar";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { FavoritesContext } from "../components/favoritescontext";
import FavouriteRecipes from "../components/favoritesrecipes";

export default function FavoriteScreen() {

    const {favorites} = useContext(FavoritesContext);

    return (
        <View className ="flex-1 bg-white">
            <StatusBar style="dark" />
            <ScrollView
                showVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 50}}
                className="space-y-6 pt-14">

            {/* desc */}
            <View style={{paddingTop: hp(2.5)}} className="mx-5 space-y-1">
                <View>
                    <Text style={{fontSize: hp(3.8)}} className="font-semibold text-neutral-600">
                        Here is your
                    </Text>
                </View>
                <Text style={{fontSize: hp(3.8)}} className="font-semibold text-red-400">
                    favorite <Text className="text-neutral-600">recipes!</Text>
                </Text>
            </View>

            {/* favorite recipes */}
            <View>
                <FavouriteRecipes favorites={favorites}/>
            </View>

            </ScrollView>
        </View>
    )
}