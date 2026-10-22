import * as SecureStore from "expo-secure-store";

// Lo UNICO que se persiste en el dispositivo es el token.
const TOKEN_KEY = "auth_token";

export const saveToken = (token: string) =>
    SecureStore.setItemAsync(TOKEN_KEY, token);

export const getToken = () =>
    SecureStore.getItemAsync(TOKEN_KEY);

export const deleteToken = () =>
    SecureStore.deleteItemAsync(TOKEN_KEY);
