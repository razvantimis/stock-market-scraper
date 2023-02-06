import type { StockPrice } from "./types";
import type { WatchAsset } from "../types";
  import { getStockPriceFromBVBPage } from "./getStockPriceFromBVBPage.ts";
import yahooFinance from "https://esm.sh/yahoo-finance2@2.3.10"


async function getLastROStockPrice(
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

async function getLastUSStockPrice(
  assetList: WatchAsset[]
): Promise<StockPrice[]> {
  const stockPriceList: StockPrice[] = [];

  const symbols = assetList.map(asset => asset.symbol);

  const results = await yahooFinance.quote(symbols, {
      fields: [
        'regularMarketOpen',
        'regularMarketDayLow',
        'regularMarketDayHigh',
        'regularMarketPrice',
        'regularMarketVolume',
        'regularMarketTime',
        'postMarketPrice',
        'preMarketPrice'
      ], return: "object"
    });
    
  for (const asset of assetList) {
    const stockData = results[asset.symbol];
    if(!stockData){
      console.warn("Missing stock price for " + asset.symbol)
      continue;
    }
    const price = stockData.regularMarketPrice;
    stockPriceList.push({
      symbol: asset.symbol,
      price: price,
      exchangeCountryCode: asset.exchangeCountryCode,
    });
  }
  return stockPriceList;
}

async function getStockPrice(watchList: WatchAsset[]): Promise<StockPrice[]> {
  const roWatchList = watchList.filter(
    (asset) => asset.exchangeCountryCode === "RO"
  );
  console.time("Fetching stock prices from RO...");
  const roStockPriceList = await getLastROStockPrice(roWatchList);
  console.timeEnd("Fetching stock prices from RO...");

  const usWatchList = watchList.filter(
    (asset) => asset.exchangeCountryCode === "US"
  );
  console.time("Fetching stock prices from US...");
  const usStockPriceList = await getLastUSStockPrice(usWatchList);
  console.timeEnd("Fetching stock prices from US...");

  const finalStockPriceList = [...roStockPriceList, ...usStockPriceList].sort(
    (asset1, asset2) => asset1.symbol.localeCompare(asset2.symbol)
  );

  return finalStockPriceList;
}
export { getStockPrice };
