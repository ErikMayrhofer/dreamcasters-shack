//import DirectusSDK from "@directus/sdk-js";

const url = "https://api.dreamcaster.obyoxion.at";

//export const client = new DirectusSDK("https://api.dreamcaster.obyoxion.at");

export enum ThumbnailKey {
  Thumbnail250 = "thumbnail250",
}

export function getAsset(
  name: string,
  key: ThumbnailKey | null = null
): string {
  return `${url}/assets/${name}${key ? "?key=" + key : ""}`;
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
      await (
        await fetchFunc(
          `${url}/items/artworks/${id}?fields[]=*&fields[]=gallery.*`
        )
      ).json()
    ).data;
    console.log(" => ", result);
    if (Array.isArray(id) && !Array.isArray(result)) {
      return [result];
    }
    return result;
  },
};
