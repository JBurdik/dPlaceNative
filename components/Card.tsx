import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Profile } from "../models/user";
import { Image } from "expo-image";
import { API_URL } from "../constants/ENV";
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent
} from "react-native-gesture-handler";
import Animated, {
    Easing,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import { transform } from "@babel/core";
import { rotateX, snapPoint } from "react-native-redash";
import { Dispatch, SetStateAction, useEffect } from "react";

const { width: wWidth, height } = Dimensions.get("window");
const aspectRatio = 5 / 3;
const CARD_WIDTH = wWidth - 60;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;

const side = wWidth + 100;
const SNAP_POINTS = [-side, 0, side];

type CardProps = {
    profileInfo: Profile;
    index: number;
    shuffleBack: Animated.SharedValue<boolean>;
    refetchCards: () => void;
};
const Card = (props: CardProps) => {
    const x = useSharedValue(0);
    const y = useSharedValue(-height);
    const scale = useSharedValue(1);
    const randomRotate = Math.random() * 15 - 10;
    const rotateZ = useSharedValue(randomRotate);
    useEffect(() => {
        const delay = (props.index - 4 + 4) * DURATION;
        y.value = withTiming(0, {
            duration: DURATION,
            easing: Easing.inOut(Easing.ease)
        });
    }, []);
    // Animation on gesture and calling add cards when approwing finish
    const onGestureEvent = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        { x: number; y: number }
    >({
        onStart: (_, ctx) => {
            ctx.x = x.value;
            ctx.y = y.value;
            scale.value = withTiming(1.1, { easing: Easing.inOut(Easing.ease) });
            rotateZ.value = withTiming(0, { easing: Easing.inOut(Easing.ease) });
        },
        onActive: ({ translationX, translationY }, ctx) => {
            x.value = ctx.x + translationX;
            y.value = ctx.y + translationY;
        },
        onEnd: ({ velocityX, velocityY }) => {
            const dest = snapPoint(x.value, velocityX, SNAP_POINTS);
            x.value = withSpring(dest, { velocity: velocityX });
            y.value = withSpring(0, { velocity: velocityY });
            scale.value = withTiming(1, { easing: Easing.inOut(Easing.ease) }, () => {
                if (props.index === 2 && dest !== 0) {
                    runOnJS(props.refetchCards)();
                }
            });
        }
    });
    // animate style and random rotate
    const style = useAnimatedStyle(() => ({
        transform: [
            { perspective: 2000 },
            { rotateX: "20deg" },
            { rotateZ: `${rotateZ.value}deg` },
            { translateX: x.value },
            { translateY: y.value },
            { scale: scale.value }
        ]
    }));
    return (
        <View style={[styles.container]} pointerEvents="box-none">
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.card, { zIndex: props.index }, style]}>
                    <Image
                        source={
                            props.profileInfo.image
                                ? props.profileInfo.image
                                : `${API_URL}/profile/${props.profileInfo.id}/image`
                        }
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 10
                        }}
                    />
                    <View style={styles.textInfo}>
                        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                            {props.profileInfo.name}
                        </Text>
                        <Text>{props.profileInfo.bio}</Text>
                    </View>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1
    },
    card: {
        backgroundColor: "white",
        borderWidth: 15,
        borderColor: "white",
        borderRadius: 10,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.45,
        shadowRadius: 3.84,
        elevation: 3
    },
    textInfo: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        backgroundColor: "hsla(0, 0%, 100%, .5)"
    }
});

export default Card;
