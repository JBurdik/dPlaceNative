import { View, Text, StyleSheet } from "react-native";
import React from "react";

const DCard = ({
  children,
  title,
  actions,
}: {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}) => {
  return (
    <View style={[style.cardWrapper, style.shadowProp]}>
      {title && <Text style={style.cardTitle}>{title}</Text>}
      <View style={style.cardContent}>{children}</View>
      {actions && <View style={style.cardActions}>{actions}</View>}
    </View>
  );
};

const style = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "auto",
    minWidth: 300,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardContent: {},
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default DCard;
