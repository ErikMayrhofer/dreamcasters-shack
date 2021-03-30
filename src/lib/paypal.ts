import { loadScript } from "@paypal/paypal-js";

let paypalInstance = null;

export const paypalLoader = {
  async load() {
    if (!paypalInstance) {
      console.count("Loading PayPal Scripts...");
      paypalInstance = await loadScript({
        "client-id":
          "AWoMdAYSvEDxZbbEnbu8sX1EpKm62MRmihlcTYmBIQJzzhkMkqfXxkQA88XsOGmNVjDASfyVH9tofX0M",
      });
    }
    return paypalInstance;
  },
};
