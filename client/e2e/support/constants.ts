const serverURL = (path: string) => {
  return "http://localhost:8000" + path;
};

export const API_ROUTES = {
  LOGIN: serverURL("/api/auth/login"),
  CHECK_MODERATOR: serverURL("/api/auth/check-moderator"),
  CREATE_MODERATOR: serverURL("/api/auth/create-moderator"),
};
