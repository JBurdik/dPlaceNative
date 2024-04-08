import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
    useWindowDimensions
} from "react-native";

import { EvilIcons, Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import ExploreSheet from "../../components/bottomSheet/ExploreSheet";
import FilterSheet from "../../components/bottomSheet/FilterSheet";
import Typography from "../../components/ui/Typography";
import Colors from "../../constants/Colors";
import djs from "../../mock/djs.json";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../constants/ENV";
import { Profile } from "../../models/user";
import { Image } from "expo-image";
import { Asset } from "expo-asset";
import { Redirect } from "expo-router";

export default function TabOneScreen() {
    const { width: screenWidth } = useWindowDimensions();
    const hiddenTranslateX = screenWidth * 2 + 300;
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(5);

    const queryClient = useQueryClient();

    const {
        data: cardFetch,
        refetch: refetchProfiles,
        isFetching
    } = useQuery<Profile[]>({
        queryKey: ["profiles"],
        initialData: [],
        queryFn: async () =>
            (
                await axios.get<Profile[]>(
                    `${API_URL}/profile/all?pageLength=${pageSize}&&page=${page}`
                )
            ).data
    });
    const [cardStack, setCardStack] = useState<Profile[]>([]);
    const [currentCardIdx, setCurrentCardIdx] = useState<number>(0);
    const [nextCardIdx, setNextCardIdx] = useState<number>(currentCardIdx + 1);

    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotate = useDerivedValue(
        () => interpolate(translateX.value, [0, hiddenTranslateX], [0, 60]) + "deg"
    );

    const swipeStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value
            },
            {
                translateY: translateY.value
            },
            {
                rotate: rotate.value
            }
        ]
    }));
    const nextCardStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            translateX.value,
            [-hiddenTranslateX, 0, hiddenTranslateX],
            [1, 0.5, 1]
        ),
        transform: [
            {
                scale: interpolate(
                    translateX.value,
                    [-hiddenTranslateX, 0, hiddenTranslateX],
                    [1, 0.8, 1]
                )
            }
        ]
    }));

    const gestureHandler = useAnimatedGestureHandler({
        onActive: e => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        },
        onFinish: e => {
            if (Math.abs(e.velocityX) < 900) {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                return;
            }
            translateX.value = withSpring(
                hiddenTranslateX * Math.sign(e.velocityX),
                {
                    restDisplacementThreshold: 100,
                    restSpeedThreshold: 1000
                },
                () => {
                    runOnJS(setCurrentCardIdx)(
                        cardStack.length - 1 === currentCardIdx ? 0 : currentCardIdx + 1
                    );
                    runOnJS(setNextCardIdx)(
                        cardStack.length - 1 === nextCardIdx ? 0 : nextCardIdx + 1
                    );
                }
            );
        }
    });
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const filterSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isFetching) return;
        const imgs = Asset.loadAsync(
            cardFetch.map(cs => `${API_URL}/profile/${cs.id}/image`)
        );
        imgs.then(imgs => {
            const newStack = cardFetch.map((cs, idx) => ({
                ...cs,
                localUri: imgs[idx].localUri
            }));
            setCardStack(prev => {
                const newCards = prev.concat(newStack);
                if (pageSize * (page + 1) === prev.length) return prev;
                return newCards;
            });
        });
    }, [isFetching, cardFetch]);

    useEffect(() => {
        if (isFetching || page === 0) return;
        refetchProfiles();
    }, [page, pageSize]);

    useEffect(() => {
        if (currentCardIdx === cardStack.length - 1) {
            setNextCardIdx(0);
        }
        // preload next cards wnen approaching the end of the stack
        if (currentCardIdx === pageSize * (page + 1) - 2) {
            setPage(prev => prev + 1);
        }
    }, [cardStack, currentCardIdx]);

    // Functions
    const openFilterSheet = () => {
        filterSheetRef.current?.collapse();
    };

    if (cardStack.length === 0)
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "black"
                }}
            >
                <ActivityIndicator size={"large"} color={"white"} />
                <Typography style={{ marginTop: 20 }}>Načítání uživatelů..</Typography>
            </View>
        );

    return (
        <View style={styles.container}>
            <Redirect href={"/cards"} />
            <Animated.View
                style={[
                    {
                        width: "100%",
                        flex: 1,
                        height: "100%",
                        zIndex: 0,
                        position: "absolute"
                    },
                    nextCardStyle
                ]}
            >
                <Image
                    style={{
                        width: "10%",
                        height: "50%",
                        alignItems: "center",
                        flex: 1
                    }}
                    source={{
                        uri:
                            cardStack[nextCardIdx].localUri ??
                            `${API_URL}/profile/${cardStack[nextCardIdx].id}/image`
                    }}
                ></Image>
            </Animated.View>
            <PanGestureHandler onGestureEvent={gestureHandler}>
                <Animated.View
                    style={[
                        {
                            width: "100%",
                            flex: 1,
                            height: "100%"
                        },
                        swipeStyle
                    ]}
                >
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            flex: 1
                        }}
                        onLoad={() => {
                            translateX.value = 0;
                            translateY.value = 0;
                            setNextCardIdx(
                                cardStack.length === currentCardIdx + 1
                                    ? 1
                                    : currentCardIdx + 1
                            );
                        }}
                        source={{
                            uri:
                                cardStack[currentCardIdx].localUri ??
                                `${API_URL}/profile/${cardStack[currentCardIdx].id}/image`
                        }}
                    ></Image>
                </Animated.View>
            </PanGestureHandler>
            <ExploreSheet ref={bottomSheetRef} userInfo={cardStack[currentCardIdx]} />
            <View style={{ position: "absolute" }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "white",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        borderRadius: 50,
                        marginTop: 15
                    }}
                    onPress={() => openFilterSheet()}
                >
                    <Ionicons name="filter" size={15} color="black" />
                    <Typography style={{ color: "black" }}>Filtr</Typography>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <Pressable
                    style={({ pressed }) => [
                        pressed
                            ? styles.pressedBtn
                            : {
                                  backgroundColor: "white"
                              },
                        styles.btn
                    ]}
                    onPress={() =>
                        setCurrentCardIdx(prev =>
                            djs.length - 1 === prev ? 0 : currentCardIdx + 1
                        )
                    }
                >
                    {({ pressed }) => (
                        <EvilIcons
                            name="refresh"
                            size={40}
                            color={pressed ? "white" : "black"}
                        />
                    )}
                </Pressable>
            </View>
            {/* filter sheet */}
            <FilterSheet ref={filterSheetRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginHorizontal: 20,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "black"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%"
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 0,
        left: "50%",
        transform: [{ translateX: -25 }], // 50 / 2 = 25
        width: 50,
        alignItems: "center"
    },
    btn: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        elevation: 5,
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        borderColor: Colors.primary,
        borderWidth: 1
    },
    pressedBtn: {
        backgroundColor: Colors.primary
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        color: "white",
        letterSpacing: 2,
        textTransform: "uppercase"
    }
});
