export interface TokenUser {
    name: string;
    email: string;
}

// Decodifica el payload del JWT (base64url) sin llamar a la API ni guardar nada.
const decodePayload = (token: string): Record<string, any> | null => {
    try {
        const part = token.split(".")[1];
        if (!part) return null;
        const b64 = part.replace(/-/g, "+").replace(/_/g, "/");
        const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
        const json = decodeURIComponent(
            atob(padded)
                .split("")
                .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        );
        return JSON.parse(json);
    } catch {
        return null;
    }
};

export const getUserFromToken = (token: string): TokenUser | null => {
    const p = decodePayload(token);
    if (!p) return null;
    return {
        name:
            p.name ??
            p.nombre ??
            p.username ??
            p.user?.name ??
            p.user?.nombre ??
            "",
        email: p.email ?? p.correo ?? p.user?.email ?? "",
    };
};
