export const useAuthStore = () => {
    const token = useState('token', () => (process.client ? localStorage.getItem('token') : null));
    const notification = useState('notification', () => '');
    const error = useState('error', () => '');

    const setToken = (newToken) => {
        token.value = newToken;
        if (process.client) {
            localStorage.setItem('token', newToken);
        }
    };

    const clearNotification = () => {
        notification.value = '';
    };

    const logout = () => {
        token.value = null;
        if (process.client) {
            localStorage.removeItem('token');
        }
    };

    const handleErrorResponse = (err) => {
        if (err.response && err.response.data && err.response.data.message) {
            return err.response.data.message;
        }
        return 'An unexpected error occurred. Please try again.';
    };

    const login = async (email, password) => {
        clearNotification();
        try {
            const { $api } = useNuxtApp();
            const { data } = await $api.post('/auth/login', { email, password });
            setToken(data.token);
            notification.value = 'Logged in successfully!';
            return data;
        } catch (err) {
            notification.value = handleErrorResponse(err);
            console.error(err);
            throw err;
        }
    };

    const register = async (email, password) => {
        clearNotification();
        try {
            const { $api } = useNuxtApp();
            const { data } = await $api.post('/auth/register', { email, password });
            setToken(data.token);
            notification.value = 'Registered successfully!';
            return data;
        } catch (err) {
            error.value = handleErrorResponse(err);
            console.error(err);
            throw err;
        }
    };

    return {
        token,
        notification,
        error,
        setToken,
        clearNotification,
        logout,
        login,
        register,
    };
};
