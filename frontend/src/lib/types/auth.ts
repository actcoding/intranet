type AppSessionData = {
    user: User;
    roles: string[];
    permissions: string[];
};

type User = {
    id: number;
    name: string;
    email: string;
    avatar_url: string | null;
    status: "active" | "disabled" | "must_reset_password";
};

type AppSession = {
    access_token?: string;
    refresh_token?: string;
    sessionData?: AppSessionData;
    expiresAt?: number;
};
