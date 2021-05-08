<script lang="ts">
  import type { Artwork } from "$lib/model";

  import { paypalLoader } from "$lib/paypal";

  import { onMount } from "svelte";
  import { isDevelopment } from "../lib/devstore";

  export let items: Artwork[] = [];

  onMount(async () => {
    const paypal = await paypalLoader.load();
    const buttonComponent = paypal.Buttons({
      createOrder: function (data, actions) {
        console.log("CREATE ORDER: ", items);
        // This function sets up the details of the transaction, including the amount and line item details.
        if (items) {
          const sum = items
            .map((it) => +it.price)
            .reduce((pre, curr) => pre + curr, 0);
          console.assert(
            sum !== null && sum !== undefined && sum > 0,
            "Calculated invalid sum for items: ",
            items
          );
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${sum}`,
                  currency_code: "EUR",
                  breakdown: {
                    item_total: {
                      value: `${sum}`,
                      currency_code: "EUR",
                    },
                    discount: {
                      value: "0",
                      currency_code: "EUR",
                    },
                    handling: {
                      value: "0",
                      currency_code: "EUR",
                    },
                    insurance: {
                      value: "0",
                      currency_code: "EUR",
                    },
                    shipping: {
                      value: "0",
                      currency_code: "EUR",
                    },
                    shipping_discount: {
                      value: "0",
                      currency_code: "EUR",
                    },
                    tax_total: {
                      value: "0",
                      currency_code: "EUR",
                    },
                  },
                },
                items: items.map((it) => ({
                  name: it.name,
                  quantity: "1",
                  sku: "A4B2C",
                  unit_amount: {
                    value: `${it.price}`,
                    currency_code: "EUR",
                  },
                  description: it.id,
                  category: "PHYSICAL_GOODS",
                })),
              },
            ],
          });
        } else {
          console.error("No items in order..");
        }
      },
      onApprove: function (data, actions) {
        console.log(data);
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function (details) {
          // This function shows a transaction success message to your buyer.
          alert("Transaction completed by " + details.payer.name.given_name);
        });
      },
    });
    buttonComponent.render("#paypal-button-container");
  });
</script>

<div id="paypal-button-container" class:prodHide={$isDevelopment === false} />
