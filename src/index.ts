import { getStockPrice } from "./stock-price/getStockPrice.ts";
import watchList from "./watch-list.json" assert { type: "json" };

async function writeToFile(filePath: string, data: any) {
  const dataString = JSON.stringify(data, null, 2);
  await Deno.writeTextFile(filePath, dataString);
}

async function updateStockPrice() {
  const finalStockPriceList = await getStockPrice(watchList);
  
  console.time("Saving stock price list...")
  await writeToFile("./data/stock-price/last-price.json", finalStockPriceList);
  console.timeEnd("Saving stock price list...")
  
}

updateStockPrice();
