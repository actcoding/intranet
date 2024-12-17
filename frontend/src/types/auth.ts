import { UserResource } from '@/lib/api/generated'
import { JWTPayload } from 'jose'

export type AppJwtPayload = {
    user: UserResource;
    roles: string[];
    permissions: string[];
}

export type AppSession = {
    accessToken?: string;
    refreshToken?: string;
    sessionData?: AppJwtPayload & JWTPayload;
}
