//import DirectusSDK from "@directus/sdk-js";

const url = "https://api.dreamcaster.obyoxion.at";

//export const client = new DirectusSDK("https://api.dreamcaster.obyoxion.at");

export function getAsset(name: string): string {
  return `${url}/assets/${name}`;
}

export const api = {
  artworks: async (fetchFunc: any) => {
    return await (await fetchFunc(`${url}/items/artworks`)).json();
  },
  artwork: async (fetchFunc: any, id: string | string[]) => {
    if (id.length == 0) {
      return { data: [] };
    }
    return await (await fetchFunc(`${url}/items/artworks/${id}`)).json();
  },
};
