export interface Auth {
    userId: number;
    username: string;
    roleNames?: string[] | null;
    jwtToken: string;
    refreshToken: string;
}
