import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(() => {
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);

        setTimeout(()=> navigation.navigate('Home'), 2500)
    },[])
    return (
        <View className ="flex-1 justify-center items-center space-y-10 bg-red-500">
            <StatusBar style="light" />

        {/* logo image */}
            <Animated.View className="bg-white/20 rounded-full" style={{padding: ring2padding}}>
                <Animated.View className="bg-white/20 rounded-full" style={{padding: ring1padding}}>
                    <Image source={require('../../assets/food-dish.png')}
                        style={{width: hp(20), height: hp(20)}} />
                </Animated.View>
            </Animated.View>

        {/* App's name */}
            <View className="flex items-center space-y-2">
                <Text style={{fontSize: hp(5)}} className="font-bold text-white tracking-widest">
                    TastyBits
                </Text>
                <Text style={{fontSize: hp(1.5)}} className="font-medium text-white tracking-widest">
                    Inspiring recipes, unforgettable meals.
                </Text>
            </View>
        </View>
    )
}
