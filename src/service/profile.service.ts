import { API_URL } from "@/constants/api";

export interface ProfileUser {
    name: string;
    email: string;
}

// GET /api/auth/me -> { user: { kind: "user", id, email } }
//                  o { user: { kind: "student", id, nombre, apellido, matricula, email } }
export const getProfileService = async (token: string): Promise<ProfileUser> => {
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.error || "No se pudo cargar el perfil");
    }

    const u = result.user;
    const fullName = [u.nombre, u.apellido].filter(Boolean).join(" ");
    return {
        name: fullName || u.email.split("@")[0],
        email: u.email,
    };
};
