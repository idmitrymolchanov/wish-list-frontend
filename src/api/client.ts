import { Configuration, ItemsApi } from "../api";

const configuration = new Configuration({
    basePath: import.meta.env.VITE_API_URL,
    accessToken: async () => localStorage.getItem("token") || "",
});

export const api = new ItemsApi(configuration);

export const API_URL = import.meta.env.VITE_API_URL;