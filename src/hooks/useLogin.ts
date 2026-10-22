import { LoginRequest } from "@/interfaces/Auth.Interface";
import { loginService } from "@/service/Auth.service";
import { saveToken } from "@/service/token.service";
import { useState } from "react";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async (
        data: LoginRequest
    ): Promise<boolean> => {
        try {
            setLoading(true);
            setError("");

            const response = await loginService(data);
            if (!response.success) {
                setError(response.message);
                return false;
            }
            if (response.token) {
                await saveToken(response.token);
            }
            return true;
        } catch (error) {
            console.error("Error en login:", error);
            setError("Ocurrio un error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {login, loading, error};
};