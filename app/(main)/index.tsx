import Button from "@/components/ui/Button";
import SliderBar from "@/components/ui/SliderBar";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
export default function Index() {
  const data = [
    {
      id: 1,
      question:
        "Kugira ngo amasezerano abe yujuje ibyangombwa agomba kuba ameze gute?",
    },
    {
      id: 2,
      question: "Mugihe umuntu yishe amasezerano nabyitwaramo nte?",
    },
    {
      id: 3,
      question: "Mugihe amasezerano asheshwe, hakurikiraho iki? Bigenda gute?",
    },
    {
      id: 4,
      question: "Gusinya amasezerano, mu buryo bwemewe namategeko bisaba iki?",
    },
  ];
  const width = Dimensions.get("screen").width;
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {}, []);

  function handleFieldChange(value: string) {
    setPrompt(value);
  }

  async function submit(query: string) {
    try {
      setQuestion(query ?? prompt);
      setLoading(true);
      const url = "https://indaba-x-rag-app.onrender.com/query";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify({
          prompt: query ?? prompt,
        }),
      });
      const data = await res.json();
      setResponse(data.message);
      setLoading(false);
    } catch (err) {
      Alert.alert("Habaye ikibazo mwihangane!");
    }
  }

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setCurrentIndex(viewableItems[0].index);
    }
  ).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "white",
            gap: 20
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.gray._800,
            }}
          >
            <View
              style={{
                width: "100%",
                borderRadius: 20,
                alignItems: "flex-start",
                paddingHorizontal: 30,
                paddingTop: 40,
                paddingBottom: 30,
              }}
            >
              <Text
                style={{
                  fontFamily: "SemiBold",
                  fontSize: 20,
                  flex: 3.7 / 4,
                  color: Colors.white,
                }}
              >
                IBIBAZO ABANTU BAKUNZE GUHURA NABYO.
              </Text>
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 12,
                  color: Colors.gray._300,
                }}
              >
                Ushobora gukanda kuri kimwe ukameya icyo igazeti ya leta
                ibivugaho.
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                borderTopStartRadius: 60,
                borderTopEndRadius: 60,
                width: "100%",
                height: 20,
              }}
            ></View>
          </View>

          <View
            style={{
              gap: 40,
              flex: 1,
              // flexGrow: 1,
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                padding: 20,
                marginHorizontal: 20,
                borderRadius: 20,
                gap: 20,
                backgroundColor: Colors.gray._50,
                position: "relative",
              }}
            >
              <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEventThrottle={32}
                onViewableItemsChanged={viewableItemsChanged}
                viewabilityConfig={viewConfig}
                ref={slidesRef}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "space-evenly",
                }}
                renderItem={({ item }) => {
                  return (
                    <View
                      key={item.id}
                      style={{
                        justifyContent: "center",
                        width: width - 80,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "SemiBold",
                          fontSize: 16,
                        }}
                      >
                        {item.question}
                      </Text>
                    </View>
                  );
                }}
              />
              <View style={{ alignItems: "flex-start" }}>
                <Button
                  color={Colors.blue._600}
                  onPress={() => {
                    submit(data[currentIndex].question);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "SemiBold",
                      fontSize: 11,
                    }}
                  >
                    AMATEGEKO ABIVUGAHO IKI?
                  </Text>
                </Button>
              </View>

              <View
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 20,
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "absolute",
                  bottom: -6,
                  right: -10,
                }}
              >
                {data.map((item, key) => {
                  return <SliderBar key={key} active={currentIndex === key} />;
                })}
              </View>
            </View>

            {response == "" && prompt == "" ? (
              <View>
                <View
                  style={{
                    marginHorizontal: 24,
                    gap: 10,
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontFamily: "Bold", fontSize: 25 }}>
                    Tubafashe iki?
                  </Text>
                </View>
              </View>
            ) : (
              <View style={{ marginHorizontal: 24, gap: 10 }}>
                <Text style={{ fontFamily: "Bold", fontSize: 25 }}>
                  {question}
                </Text>

                {loading ? (
                  <ActivityIndicator color={Colors.gray._700} />
                ) : (
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 15,
                      color: Colors.gray._700,
                    }}
                  >
                    {response}
                  </Text>
                )}
              </View>
            )}
          </View>

          <View>
            <View
              style={{
                flex: 1,
                backgroundColor: Colors.gray._700,
                marginTop: "auto",
                paddingHorizontal: 12,
                paddingVertical: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                width: width,
              }}
            >
              <TextInput
                value={prompt}
                placeholder="Andika aha icyo ukeneye"
                placeholderTextColor={Colors.gray._300}
                style={{
                  color: "white",
                  flexGrow: 1,
                  paddingRight: 4,
                  flex: 1,
                }}
                cursorColor={Colors.blue._600}
                onChangeText={(e) => {
                  handleFieldChange(e);
                }}
              />
              <Button color="white" onPress={submit}>
                <Text style={{ fontFamily: "Bold", fontSize: 12 }}>Emeza</Text>
                <MaterialIcons name="navigate-next" size={24} color="black" />
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}
