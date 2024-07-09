import Avatar from "@/constants/Avatar";
import LinearAvatar from "@/constants/LinearAvatar";
import LinearGradientBox from "@/constants/LinearGradientBox";
import { Circle, KallumUser } from "@/hooks/kaeInterfaces";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

interface CircleCardProps {
  item: Circle;
}

const CircleCard: React.FC<CircleCardProps> = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => router.push(`circle/${item.circleId}`)}>
      <LinearGradientBox style={styles.card}>
        <View style={styles.circlesContainer}>
          <LinearAvatar name={item.name} size={80} />
          {item.friends.map((initial, index) => (
            <View key={index} style={[styles.circle, styles[`circle${index}`]]}>
              <Avatar name={initial.userName} />
            </View>
          ))}
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.friendsCount}>{item.friends.length} friends</Text>
      </LinearGradientBox>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");
const cardWidth = width * 0.8;

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 5,
  },
  circlesContainer: {
    position: "relative",
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  circle0: {
    top: 10,
    left: 60,
  },
  circle1: {
    top: 60,
    left: 0,
  },
  circle2: {
    top: 30,
    left: 60,
  },
  circle3: {
    top: 60,
    left: 30,
  },
  circle4: {
    top: 30,
    left: 30,
    backgroundColor: "black",
  },
  initial: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  friendsCount: {
    fontSize: 14,
    color: "gray",
  },
});

export default CircleCard;
