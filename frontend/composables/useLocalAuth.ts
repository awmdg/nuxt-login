export default function useLocalAuth() {
  const cookieOptions = {
    domain: useRuntimeConfig().public.DOMAIN as string,
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
  };

  async function login({ email = "", password = "", role = "" }) {
    return useNuxtApp().$api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password, role }),
    });
  }

  function setToken({ refreshToken = "", accessToken = "", user = "" }) {
    useCookie("accessToken", cookieOptions).value = accessToken;
    useCookie("refreshToken", cookieOptions).value = refreshToken;
    useCookie("user", cookieOptions).value = user;
  }

  function clearCookies() {
    useCookie("accessToken", cookieOptions).value = null;
    useCookie("refreshToken", cookieOptions).value = null;
    useCookie("user", cookieOptions).value = null;
    useCookie("organization", cookieOptions).value = null;
  }

  async function logout() {
    try {
      await useAPI("/v1/auth/logout", {
        method: "POST",
        body: JSON.stringify({ token: useCookie("refreshToken").value }),
      });
      clearCookies();
      navigateTo({ name: "index" });
    } catch (error) {
      console.log(error);
    }
  }

  function getCurrentUser() {
    const user = useCookie("user").value;
    return useNuxtApp().$api(`/api/users/user/email/${user}`, { method: "GET" });
  }

  return {
    login,
    logout,
    clearCookies,
    getCurrentUser,
    setToken,
  }
}