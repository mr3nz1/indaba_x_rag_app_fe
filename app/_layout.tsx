import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as NavigationBar from "expo-navigation-bar";
import * as SecureStore from "expo-secure-store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Light: require("../assets/fonts/Rubik-Light.ttf"),
    Medium: require("../assets/fonts/Rubik-Medium.ttf"),
    Regular: require("../assets/fonts/Rubik-Regular.ttf"),
    SemiBold: require("../assets/fonts/Rubik-SemiBold.ttf"),
    Bold: require("../assets/fonts/Rubik-Bold.ttf"),
    ExtraBold: require("../assets/fonts/Rubik-ExtraBold.ttf"),
  });
  const [onBoardingViewed, setOnBoardingViewed] = useState(false);

  useEffect(() => {
    async function handleNavigationButtons() {
      await NavigationBar.setPositionAsync("absolute");
      await NavigationBar.setBackgroundColorAsync("#ffffff00");
      await NavigationBar.setBehaviorAsync("inset-swipe");
      await NavigationBar.setVisibilityAsync("hidden");

      NavigationBar.addVisibilityListener(({ visibility }) => {
        if (visibility === "visible") {
          setTimeout(async () => {
            await NavigationBar.setVisibilityAsync("hidden");
          }, 2000);
        }
      });
    }

    (async () => {
      const res = SecureStore.getItem("onBoardingViewed");
      setOnBoardingViewed(res === "true");
    })();

    if (loaded) {
      handleNavigationButtons();
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ statusBarTranslucent: true }}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
          // redirect={onBoardingViewed}
        />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
