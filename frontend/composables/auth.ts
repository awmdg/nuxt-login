export const useAuthStore = () => {
  const token = ref<string | null>(
    process.client ? localStorage.getItem("token") : null
  );
  const notification = ref<string>("");
  const error = ref<string>("");

  const setToken = (newToken: string) => {
    token.value = newToken;
    if (process.client) {
      localStorage.setItem("token", newToken);
    }
  };

  const clearNotification = () => {
    notification.value = "";
  };

  const logout = () => {
    token.value = null;
    if (process.client) {
      localStorage.removeItem("token");
    }
  };

  const login = async (email: string, password: string) => {
    clearNotification();
    try {
      const { $api } = useNuxtApp();
      const { data } = await $api.post("/auth/login", { email, password });
      setToken(data.token);
      notification.value = "Logged in successfully!";
      error.value = "";
      return data;
    } catch (err: any) {
      handleApiError(err);
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    clearNotification();
    try {
      const { $api } = useNuxtApp();
      const { data } = await $api.post("/auth/register", { email, password });
      setToken(data.token);
      notification.value = "Registered successfully!";
      error.value = "";
      return data;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  };

  const handleApiError = (err: any) => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          error.value = "Incorrect email or password. Please try again.";
          break;
        case 404:
          error.value =
            "Service not found. Please check your network connection or contact support.";
          break;
        default:
          error.value = "An unexpected error occurred. Please try again.";
      }
    } else {
      error.value = "An unexpected error occurred. Please try again.";
    }
    console.error(err); // Log the unexpected error for debugging purposes
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
