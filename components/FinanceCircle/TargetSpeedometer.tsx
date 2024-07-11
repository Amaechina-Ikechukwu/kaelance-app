import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const TargetSpeedometer = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(Math.floor(Math.random() * 120)); // Simulate changing speed
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.speedometer}>
        {/* Outer circle */}
        <View style={styles.outerCircle} />

        {/* Inner circle */}
        <View style={styles.innerCircle} />

        {/* Speed text */}
        <Text style={styles.speedText}>{speed} km/h</Text>

        {/* Colored arc */}
        <View style={styles.arcContainer}>
          <View
            style={[
              styles.arc,
              { transform: [{ rotate: `-${speed * 1.5}deg` }] },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  speedometer: {
    width: 200,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden", // Clip the colored arc within the speedometer
  },
  outerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "gray",
    position: "absolute",
    top: -50, // Adjust position to center vertically
    left: 0,
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    position: "absolute",
    top: -30, // Adjust position to center vertically
    left: 10,
  },
  speedText: {
    position: "absolute",
    fontSize: 24,
    fontWeight: "bold",
    top: 45, // Adjust position to center vertically
  },
  arcContainer: {
    width: 200,
    height: 100,
    overflow: "hidden", // Clip the colored arc within this container
    position: "absolute",
    top: 0,
    left: 0,
  },
  arc: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default TargetSpeedometer;
