import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors, pink } from "@/constants/Colors";
import Avatar from "@/constants/Avatar";
import { height, statusBarHeight, width } from "@/constants/StatusBarHeight";
import FinanceCircle from "@/components/HomeInterfaces/FinanceCircle";
import { FlatList } from "react-native-gesture-handler";
import kaeStore from "@/hooks/kaestore";
import { useShallow } from "zustand/react/shallow";
import CircleCreation from "@/components/FinanceCircle/CircleCreation";
import { useBottomSheet } from "@/hooks/BottomSheetProvider";
import CircleCard from "@/components/FinanceCircle/CircleCard";
import { Circle } from "@/hooks/kaeInterfaces";
const EmptyCircle = () => {
  const theme = useColorScheme() ?? "light";
  const { openBottomSheet } = useBottomSheet();
  return (
    <ThemedView>
      <ThemedView
        style={[
          styles.pinkContainer,
          {
            backgroundColor: pink,
            alignItems: "center",
            gap: 14,
          },
        ]}
      >
        <View style={[styles.circleContainer]}>
          <Avatar name="Kaelance" />
          <ThemedText>You do not have or belong to a circle yet</ThemedText>
        </View>
        <TouchableOpacity
          onPress={() => openBottomSheet(<CircleCreation />)}
          style={{
            width: "70%",
            alignItems: "center",
            backgroundColor: Colors[theme].text,
            margin: 0,
            padding: 10,
          }}
        >
          <ThemedText style={{ color: Colors[theme].background }}>
            Create a finance circle now
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

export default function TabTwoScreen() {
  const theme = useColorScheme() ?? "light";
  const [financeCircle] = kaeStore(
    useShallow((state) => [state.financeCircle])
  );
  const renderItem = ({ item }: { item: Circle }) => {
    return (
      <View
        style={[
          styles.circleContainer,
          { backgroundColor: Colors[theme].background },
        ]}
      >
        <CircleCard item={item} />
      </View>
    );
  };
  return (
    <ThemedView style={styles.container}>
      <FlatList
        // style={{ width: "100%" }}
        // contentContainerStyle={{ width: "100%" }}
        data={financeCircle}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyCircle />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: statusBarHeight,
  },
  pinkContainer: {
    borderRadius: 10,
    width: width * 0.9,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  circleContainer: {
    width: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});
