import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import AppwriteContext, {
  useAppwrite,
} from "../../src/contexts/AppwriteContext";

const ProfilePage = () => {
  const router = useRouter();
  const { logout, userData, isLoggedIn } = useAppwrite();
  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text>{userData.name}</Text>
          <Text>{userData.email}</Text>
          <Button title="Logout" onPress={() => logout()} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfilePage;
