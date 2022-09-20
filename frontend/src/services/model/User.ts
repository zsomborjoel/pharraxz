export interface User {
    userId: number;
    username: string;
    roleNames?: string[] | null;
    jwtToken: string;
    refreshToken: string;
}
