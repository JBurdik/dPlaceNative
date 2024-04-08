import { Alert, Platform, StyleSheet, Switch, Text, View } from "react-native";
import React, {
  MutableRefObject,
  Ref,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "../../constants/Colors";
import Typography from "../ui/Typography";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import Label from "../ui/Label";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";
import Dbutton from "../ui/Dbutton";

const FilterSheet = forwardRef<BottomSheet>((_, ref) => {
  const [select, setSelect] = useState<ItemValue>("all");
  const [idx, setIdx] = useState<number>(-1);
  const filterSnapPoints = useMemo(
    () => [Platform.OS === "ios" ? "50%" : "30%"],
    []
  );
  return (
    <BottomSheet
      index={idx}
      ref={ref}
      snapPoints={filterSnapPoints}
      backgroundStyle={{ backgroundColor: "hsla(0, 0%, 15%, 1)" }}
      enablePanDownToClose
      handleIndicatorStyle={{ backgroundColor: Colors.primary }}
    >
      <View style={{ paddingHorizontal: 20 }}>
        <Typography
          style={{ fontWeight: "900", textAlign: "center" }}
          variant="h1"
        >
          Chci DJ na:
        </Typography>
        <View>
          {Platform.OS === "ios" ? (
            <PickerIOS
              selectedValue={select}
              onValueChange={(e) => setSelect(e)}
              itemStyle={{ color: "white" }}
            >
              <PickerIOS.Item label="Svatbu" value="weddings" />
              <PickerIOS.Item label="Oslavu" value="celebration" />
              <PickerIOS.Item label="Vše" value="all" />
              <PickerIOS.Item label="Párty" value="parties" />
              <PickerIOS.Item label="Firemní akci" value="company-action" />
            </PickerIOS>
          ) : (
            <Picker
              style={{ color: "white", marginBottom: 20 }}
              dropdownIconColor={"white"}
              itemStyle={{ color: "white" }}
              selectedValue={select}
              onValueChange={(e) => setSelect(e)}
            >
              <Picker.Item label="Svatbu" value="weddings" />
              <Picker.Item label="Oslavu" value="celebration" />
              <PickerIOS.Item label="Vše" value="all" />
              <Picker.Item label="Párty" value="parties" />
              <Picker.Item label="Firemní akci" value="company-action" />
            </Picker>
          )}
        </View>
        <View>
          <Dbutton
            title="Filtrovat"
            onPress={() => {
              Alert.alert("Vybraná možnost:", select.toString() ?? "");
              // @ts-ignore
              ref.current?.close();
            }}
          />
        </View>
      </View>
    </BottomSheet>
  );
});

export default FilterSheet;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
});
