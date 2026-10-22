import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

import { LoginFormProps } from "@/interfaces/Auth.Interface";

export default function LoginForm({
                                      onLogin,
                                      loading,
                                      error,
                                  }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Errores de formulario (por campo)
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    // Limpia el error del campo en cuanto el usuario empieza a corregirlo
    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (text.trim() !== "") {
            setEmailError("");
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() !== "") {
            setPasswordError("");
        }
    };

    const handleLogin = () => {
        if (loading) return; // evita múltiples envíos

        let valid = true;

        setEmailError("");
        setPasswordError("");

        if (email.trim() === "") {
            setEmailError("El usuario es obligatorio");
            valid = false;
        }

        if (password.trim() === "") {
            setPasswordError("La contraseña es obligatoria");
            valid = false;
        }

        if (!valid) {
            return;
        }

        onLogin(email.trim(), password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Iniciar sesión
            </Text>

            <Text style={styles.label}>Usuario</Text>

            <TextInput
                style={[
                    styles.input,
                    emailError !== "" && styles.inputError,
                ]}
                placeholder="Ingresa tu usuario"
                value={email}
                onChangeText={handleEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                placeholderTextColor="#999"
            />

            {emailError !== "" && (
                <Text style={styles.error}>
                    {emailError}
                </Text>
            )}

            <Text style={styles.label}>Contraseña</Text>

            <View
                style={[
                    styles.passwordContainer,
                    passwordError !== "" && styles.inputError,
                ]}
            >
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                    placeholderTextColor="#999"
                />

                <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.showButton}
                    disabled={loading}
                >
                    <Text style={styles.showButtonText}>
                        {showPassword ? "Ocultar" : "Mostrar"}
                    </Text>
                </Pressable>
            </View>

            {passwordError !== "" && (
                <Text style={styles.error}>
                    {passwordError}
                </Text>
            )}

            {/* Error de autenticación (viene del hook/servicio) */}
            {error !== "" && (
                <Text style={styles.error}>
                    ⚠ {error}
                </Text>
            )}

            <TouchableOpacity
                style={[
                    styles.button,
                    loading && styles.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <View style={styles.loadingRow}>
                        <ActivityIndicator
                            color="#fff"
                            size="small"
                        />
                        <Text style={styles.buttonText}>
                            Validando...
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.buttonText}>
                        Iniciar sesión
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
        textAlign: "center",
    },

    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "#333",
    },

    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 5,
        fontSize: 16,
        backgroundColor: "#fff",
        color: "#333",
    },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 5,
        backgroundColor: "#fff",
    },

    passwordInput: {
        flex: 1,
        height: "100%",
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#333",
    },

    showButton: {
        paddingHorizontal: 12,
        height: "100%",
        justifyContent: "center",
    },

    showButtonText: {
        color: "#007AFF",
        fontWeight: "600",
    },

    inputError: {
        borderColor: "red",
    },

    error: {
        color: "red",
        fontSize: 14,
        marginBottom: 15,
    },

    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#007AFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },

    buttonDisabled: {
        backgroundColor: "#999",
    },

    loadingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
