const apiUrl = process.env.REACT_APP_API_URL;

if (!apiUrl) {
  throw new Error("API_URL is not defined in the environment variables");
}

export const CONFIG = {
  API_URL: apiUrl,
};
