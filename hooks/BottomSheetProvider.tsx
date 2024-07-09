import React, {
  createContext,
  useContext,
  useRef,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

interface BottomSheetContextProps {
  openBottomSheet: (component: ReactNode) => void;
  closeBottomSheet: () => void;
  executeFunction: (fn: () => void) => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(
  undefined
);

interface BottomSheetProviderProps {
  children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({
  children,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const [content, setContent] = useState<ReactNode>(null);

  const openBottomSheet = (component: ReactNode) => {
    setContent(component);
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const executeFunction = (fn: () => void) => {
    fn();
  };

  return (
    <BottomSheetContext.Provider
      value={{ openBottomSheet, closeBottomSheet, executeFunction }}
    >
      <BottomSheetModalProvider>
        {children}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>{content}</View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheet = (): BottomSheetContextProps => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
