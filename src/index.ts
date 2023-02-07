import { getStockPrice } from "./stock-price/getStockPrice.ts";
import type { WatchAsset } from "./types";
import watchList from "./watch-list.json" assert { type: "json" };
import prevLastPrice from "../data/stock-price/last-price.json" assert { type: "json" };

import type { StockPrice } from "./stock-price/types";
type StockPriceGrouped = { [key: string]: number };

async function writeToFile(filePath: string, data: any) {
  const dataString = JSON.stringify(data, null, 2);
  await Deno.writeTextFile(filePath, dataString);
}
const getStockPriceKey = (stock: WatchAsset): string =>
  `${stock.exchangeCountryCode}:${stock.symbol}`;
async function updateStockPrice() {
  const finalStockPriceList: StockPrice[] = await getStockPrice(watchList);
  
  if (finalStockPriceList.length === 0) return;

  console.time("Saving stock price list...");
  const mergeStockPriceGrouped: StockPriceGrouped = {
    ...(prevLastPrice ?? {}),
  };

  for (const updateStockPrice of finalStockPriceList) {
    mergeStockPriceGrouped[getStockPriceKey(updateStockPrice)] =
      updateStockPrice.price;
  }

  await writeToFile(
    "./data/stock-price/last-price.json",
    mergeStockPriceGrouped
  );
  console.timeEnd("Saving stock price list...");
}

updateStockPrice();
