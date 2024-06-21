import SliderBar from "@/components/ui/SliderBar";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions, Animated } from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Title from "@/components/ui/Title";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/ui/Button";

export default function Index() {
  const data = [
    {
      id: 1,
      title: "MENYA ICYO ITEGEKO NSHINGA RIVUGA.",
      image: require("../assets/images/onboarding_screen_1.jpg"),
    },
    {
      id: 2,
      title: "UBUFASHA BUKUNOGEYE.",
      image: require("../assets/images/onboarding_screen_2.jpg"),
    },
    {
      id: 3,
      title: "ISHIMIRE UBURYO BUSHYA BUNOZE.",
      image: require("../assets/images/onboarding_screen_3.jpg"),
    },
  ];
  const width = Dimensions.get("screen").width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  async function scrollToNext() {
    if (currentIndex < data.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      (async () => {
        SecureStore.setItemAsync("onBoardingViewed", "true");
      })();
      router.replace("/(main)");
    }
  }

  return (
    <>
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1, backgroundColor: "white", paddingVertical: 24 }}
        contentContainerStyle={{ flexGrow: 1, width: "100%", gap: 16 }}
      >
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 20,
            flexDirection: "row",
            gap: 4,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {data.map((item, key) => {
            return <SliderBar key={key} active={currentIndex === key} />;
          })}
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 3.7 / 4 }}
          pagingEnabled
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-evenly",
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          renderItem={({ item }) => {
            return (
              <View
                key={item.id}
                style={{
                  width: width,
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Title>{item.title}</Title>
                </View>
                <View>
                  <Image
                    source={item.image}
                    style={{
                      width: width - 80,
                      height: 400,
                      borderRadius: 100,
                    }}
                  />
                </View>
              </View>
            );
          }}
        />

        <View
          style={{
            marginTop: "auto",
            alignItems: "flex-start",
            paddingHorizontal: 24,
            marginBottom: 30,
          }}
        >
          <Button onPress={scrollToNext}>
            <Text style={{ fontSize: 20, fontFamily: "Bold", color: "white" }}>
              {currentIndex < data.length - 1 ? "KOMEZA" : "TANGIRA"}
            </Text>
            <AntDesign name="arrowright" size={24} color="white" />
          </Button>
        </View>
      </ScrollView>
    </>
  );
}
