import { Browser } from "./network/browser.ts";

(async () => {
  const browser = new Browser();
  const {body} = await browser.go('https://examples.deno.land/http-requests')

  console.log(`body:\n${body}`);
})();
