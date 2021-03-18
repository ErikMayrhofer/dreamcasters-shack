import { writable } from "svelte/store";

export const isDevelopment = writable(process.env.NODE_ENV === "development");
