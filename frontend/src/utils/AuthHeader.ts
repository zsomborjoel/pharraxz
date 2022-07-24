const STORAGE_ITEM_USER = 'user';

export default function AuthHeader(): any {
    const json = localStorage.getItem(STORAGE_ITEM_USER);
    if (json === null) {
        return null;
    }
    return { Authorization: `Bearer ${JSON.parse(json).jwtToken}` };
}
