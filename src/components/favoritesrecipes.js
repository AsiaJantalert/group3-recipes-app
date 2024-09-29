import { View, Text, Pressable, Image } from 'react-native'
import React, {useContext} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import MasonryList from '@react-native-seoul/masonry-list';
import { recipeData } from '../data/recipeData';
import Animated, { FadeInDown } from 'react-native-reanimated'
import Loading from './loading';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from './favoritescontext';

export default function FavouriteRecipes() {

    const navigation = useNavigation();
    const {favorites} = useContext(FavoritesContext);

    return (
        <View className="mx-5 space-y-4">
            <Text style={{fontSize: hp(3)}} className="font-semibold text-neutral-600">
                favorite recipes
            </Text>
            <View>
            {
                favorites.length==0? (
                    <View className="mt-20">
                        <Text style={{fontSize: hp(2)}} className="flex-1 text-center text-neutral-400">
                            no favorite recipes...
                        </Text>
                    </View>
                ): (
                <MasonryList
                    data={favorites}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    // refreshing={isLoadingNext}
                    // onRefresh={() => refetch({first: ITEM_CNT})}
                    onEndReachedThreshold={0.1}
                    // onEndReached={() => loadNext(ITEM_CNT)}
                />
                )
            } 
            </View>
        </View>
    )
}

const RecipeCard = ({item, index, navigation}) => {
    let isEven = index%2==0;
    return (
        <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
            <Pressable
            style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven? 8:0}}
            className="flex justify-center mb-4 space-y-1"
            onPress={()=> navigation.navigate('RecipeDetail', {...item})}>
                <Image
                source={{uri: item.strMealThumb}}
                style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}}
                className="bg-black/5" />
                <Text style={{fontSize: hp(1.5)}} className="font-semibold ml-2 text-neutral-600">
                    {
                        item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}