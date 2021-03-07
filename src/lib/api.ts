import DirectusSDK from "@directus/sdk-js";

export const client = new DirectusSDK("https://api.dreamcaster.obyoxion.at");

export function getAsset(name: string): string {
  return `https://api.dreamcaster.obyoxion.at/assets/${name}`;
}
