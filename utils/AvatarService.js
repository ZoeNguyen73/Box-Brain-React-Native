import handleGlobalError from "./ErrorHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateAvatar = async (axiosPrivate, username, newAvatar, setAuth) => {
  try {
    const response = await axiosPrivate.put(
      `/users/${username}`,
      { avatar: newAvatar }
    );
    await AsyncStorage.setItem("avatar", newAvatar);
    setAuth(prev => {
      return {...prev, avatar: newAvatar}
    });
    return response.data;
  } catch (error) {
    handleGlobalError(error);
  }
};