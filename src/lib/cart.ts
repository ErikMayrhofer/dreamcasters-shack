import { derived, writable } from "svelte/store";

export interface CartItem {
  id: string;
}

export interface CartData {
  items: CartItem[];
}

function loadCart(): CartData {
  let loaded = JSON.parse(localStorage.getItem("cart")) || { items: [] };
  return loaded as CartData;
}

const { subscribe, set, update } = writable<CartData>({ items: [] });

export const cart = {
  subscribe,
  addItem: (item: CartItem) =>
    update((cart: CartData) => ({
      items: [...cart.items, item],
    })),
  clear: () => set({ items: [] }),
  remove: (itemId: string) =>
    update((cart: CartData) => ({
      items: [...cart.items.filter((it) => it.id != itemId)],
    })),
  useLocalStorage: () => {
    set(loadCart());
    subscribe((current) =>
      localStorage.setItem("cart", JSON.stringify(current))
    );
  },
};
export const cartItems = derived(cart, (val) => val.items);

export function encodeCart(cart: CartItem[]): string {
  const cartValue = JSON.stringify(cart);
  return `encodedCartContents=${window.encodeURIComponent(cartValue)}`;
}
export function decodeCart(encodedCartContents: string): CartItem[] {
  console.log(encodedCartContents);
  const json = decodeURIComponent(encodedCartContents);
  console.log(json);
  return JSON.parse(json);
}
