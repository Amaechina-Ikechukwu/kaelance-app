import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Animated,
  Text,
  StyleSheet,
  TextInputProps,
  useColorScheme,
  Dimensions,
} from "react-native";
import { Colors, blue } from "./Colors";
const { width } = Dimensions.get("window");
interface KallumInputProps extends TextInputProps {
  label: string;
  value?: string | any;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  styles?: {};
}

const KaeInput: React.FC<KallumInputProps> = ({
  label,
  value,
  setValue,
  styles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;
  const theme = useColorScheme() ?? "light";

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedIsFocused, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const inputStyle = {
    cursorColor: blue,
    placeholderTextColor: Colors[theme].text,
  };

  const labelStyle = {
    position: "absolute" as "absolute",
    left: 0,

    letterSpacing: 3,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    fontWidth: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["500", "500"],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [
        value && value.length > 0 ? "transparent" : "#aaa",
        Colors[theme].text,
      ],
    }),
    backgroundColor: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", Colors[theme].background],
    }),
    paddingHorizontal: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 5],
    }),
  };

  const viewStyle = {
    letterSpacing: 3,
    borderWidth: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 2],
    }),
    borderRadius: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 10],
    }),
    borderColor: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors[theme].text, Colors[theme].text],
    }),

    padding: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    }),
    backgroundColor: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors[theme].hueTint, Colors[theme].hueTint],
    }),
  };

  return (
    <View style={[styles]}>
      <Animated.View style={viewStyle}>
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <TextInput
          {...props}
          style={[
            defaultStyles.input,

            {
              color: Colors[theme].text,
              padding: 20,
              letterSpacing: 3,
              width: width * 0.9,
            },
            props.style,
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          blurOnSubmit
          value={value}
          onChangeText={setValue}
          {...inputStyle}
        />
      </Animated.View>
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  input: {
    height: 60,
    fontSize: 16,

    letterSpacing: 3,
  },
});

export default KaeInput;
