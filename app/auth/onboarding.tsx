import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  useColorScheme,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Step1 from "@/components/Onboarding/Step1";
import Step2 from "@/components/Onboarding/Step2";
import Step3 from "@/components/Onboarding/Step3";
import { KaeButton } from "@/constants/KaeButton";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
const { width } = Dimensions.get("window");

export default function Onboarding() {
  const theme = useColorScheme() ?? "light";
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonContainer: {
      position: "absolute",
      bottom: 20,
      width: "100%",
      alignItems: "center",
    },
    counterContainer: {
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      bottom: 60,
      width: "100%",
    },
    counter: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: Colors[theme].hueTint,
      margin: 15,
    },
    activeCounter: {
      backgroundColor: Colors[theme].text,
    },
  });
  const components = [<Step1 key="1" />, <Step2 key="2" />, <Step3 key="3" />];
  const [currentStep, setCurrentStep] = useState(0);
  const swipeAnim = useRef(new Animated.Value(0)).current;
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % components.length);
    }, 5000); // Change step every 5 seconds

    return () => clearTimeout(timeout);
  }, [currentStep]);

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: position.x } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX < -width / 3) {
        Animated.timing(position.x, {
          toValue: -width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          position.setValue({ x: 0, y: 0 });
          setCurrentStep((prevStep) => (prevStep + 1) % components.length);
        });
      } else if (translationX > width / 3) {
        Animated.timing(position.x, {
          toValue: width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          position.setValue({ x: 0, y: 0 });
          setCurrentStep(
            (prevStep) => (prevStep - 1 + components.length) % components.length
          );
        });
      } else {
        Animated.timing(position.x, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    }
  };
  const goToLogin = async () => {
    try {
      await SecureStore.setItemAsync("newUser", "token");
      router.push("/auth/");
    } catch (error) {}
  };

  return (
    <ThemedView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={{ flex: 1, transform: [{ translateX: position.x }] }}
        >
          {components[currentStep]}
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.counterContainer}>
        {components.map((_, index) => (
          <View
            key={index}
            style={[
              styles.counter,
              currentStep === index ? styles.activeCounter : null,
            ]}
          />
        ))}
      </View>
      <ThemedView style={styles.buttonContainer}>
        <KaeButton onPress={goToLogin} text="Continue with Kaelance" />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 60,
    width: "100%",
  },
  counter: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeCounter: {
    backgroundColor: "#000",
  },
});
