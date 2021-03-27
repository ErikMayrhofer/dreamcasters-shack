import { dev } from "$app/env";
import { writable } from "svelte/store";

export const isDevelopment = writable(dev);
