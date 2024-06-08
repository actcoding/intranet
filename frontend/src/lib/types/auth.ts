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
};
