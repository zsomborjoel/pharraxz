export default function AuthHeader(): any {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
}
