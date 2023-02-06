import type { StockPrice } from "./types";
import type { WatchAsset } from "../types";
import { getStockPriceFromBVBPage } from "./getStockPriceFromBVBPage.ts";

async function getLastBvbStockPrice(
  assetList: WatchAsset[]
): Promise<StockPrice[]> {
  const stockPriceList: StockPrice[] = [];

  for (const asset of assetList) {
    const price = await getStockPriceFromBVBPage(asset.symbol);

    stockPriceList.push({
      symbol: asset.symbol,
      price: price,
      exchangeCountryCode: asset.exchangeCountryCode,
    });
  }
  return stockPriceList;
}
async function getStockPrice(watchList: WatchAsset[]): Promise<StockPrice[]> {
  const bvbWatchList = watchList.filter(
    (asset) => asset.exchangeCountryCode === "RO"
  );
  console.time("Fetching BVB prices...")
  const bvbStockPriceList = await getLastBvbStockPrice(bvbWatchList);
  console.timeEnd("Fetching BVB prices...")

  const finalStockPriceList = [...bvbStockPriceList].sort((asset1, asset2) =>
    asset1.symbol.localeCompare(asset2.symbol)
  );

  return finalStockPriceList;
}
export { getStockPrice };
