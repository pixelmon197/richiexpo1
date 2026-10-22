import {
  LoginRequest,
  LoginResponse
} from "../interfaces/Auth.Interface";

import { API_URL } from "@/constants/api";


export const loginService = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
        body: JSON.stringify(data),
        });
    const result = await response.json();

if (!response.ok) {
    return {
      success: false,
      message: result.message || "Usuario o contraseña incorrectas",
      flag: false,
    };
  }

    return {
      success: true,
      message: "Login correcto",
      ...result // Si la API retorna tokens o datos de usuario
    };
  } catch (error) {
    return {
      success: false,
      message: "Error de conexión con el servidor"
    };
  }
};