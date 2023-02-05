import { getStockPriceFroBVB } from "./bvb/stock-price-scraper.ts";

import watchAssetList from "./watch-list.json" assert { type: "json" };

type StockPrice = {
  symbol: string;
  price: number;
  exchangeCountryCode: string;
};

async function updateBvbStockPrice() {
  const stockPriceList: StockPrice[] = [];

  for (const watchAsset of watchAssetList) {
    const price = await getStockPriceFroBVB(watchAsset.symbol);

    stockPriceList.push({
      symbol: watchAsset.symbol,
      price: price,
      exchangeCountryCode: watchAsset.exchangeCountryCode,
    });
  }

  await writeToFile("stock-price/RO.json", stockPriceList);
}

async function writeToFile(filePath: string, data: any) {
  const path = "./data/" + filePath;
  await Deno.writeTextFile(path, JSON.stringify(data, null, 2));
}

updateBvbStockPrice();
