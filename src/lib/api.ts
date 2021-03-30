//import DirectusSDK from "@directus/sdk-js";

const url = "https://api.dreamcaster.obyoxion.at";

//export const client = new DirectusSDK("https://api.dreamcaster.obyoxion.at");

export function getAsset(name: string): string {
  return `${url}/assets/${name}`;
}

export const api = {
  artworks: async (fetchFunc: any) => {
    return (await (await fetchFunc(`${url}/items/artworks`)).json()).data;
  },
  artwork: async (fetchFunc: any, id: string | string[]) => {
    if (Array.isArray(id)) {
      id = id.filter((it) => it !== null && it !== undefined);
    }
    if (id.length == 0) {
      return [];
    }
    console.log("Fetching: ", id);
    const result = (
      await (await fetchFunc(`${url}/items/artworks/${id}`)).json()
    ).data;
    console.log(" => ", result);
    if (Array.isArray(id) && !Array.isArray(result)) {
      return [result];
    }
    return result;
  },
};
