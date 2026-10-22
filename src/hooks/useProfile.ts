import { useEffect, useState } from "react";
import { getToken } from "@/service/token.service";
import { getProfileService, ProfileUser } from "@/service/profile.service";

// Nombre y correo viven solo en memoria (estado de React); no se persisten.
export const useProfile = () => {
    const [user, setUser] = useState<ProfileUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const token = await getToken();
                if (!token) {
                    setError("No hay sesión iniciada");
                    return;
                }
                setUser(await getProfileService(token));
            } catch (e) {
                setError(e instanceof Error ? e.message : "Error de conexión");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { user, loading, error };
};
