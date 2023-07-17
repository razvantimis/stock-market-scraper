import type { StockPrice } from "./types";
import type { WatchAsset } from "../types";
import { getStockPriceFromBVBPage } from "./getStockPriceFromBVBPage.ts";
import yahooFinance from "https://esm.sh/yahoo-finance2@2.4.2";
import { isBVBMarketOpen } from "../utils/isBVBMarketOpen.ts";
import { isNYSEMarketOpen } from "../utils/isNYSEMarketOpen.ts";

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

  const symbols = assetList.map((asset) => asset.symbol);

  const results = await yahooFinance.quote(symbols, {
    fields: [
      "regularMarketOpen",
      "regularMarketDayLow",
      "regularMarketDayHigh",
      "regularMarketPrice",
      "regularMarketVolume",
      "regularMarketTime",
      "postMarketPrice",
      "preMarketPrice",
    ],
    return: "object",
  });

  for (const asset of assetList) {
    const stockData = results[asset.symbol];
    if (!stockData) {
      console.warn("Missing stock price for " + asset.symbol);
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
/** 
  Fetch the stock prices from watch list 
  Check if market is open, so it can return partial list
*/
async function getStockPrice(watchList: WatchAsset[]): Promise<StockPrice[]> {
  const finalStockPriceList: StockPrice[] = [];

  if (isBVBMarketOpen()) {
    const roWatchList = watchList.filter(
      (asset) => asset.exchangeCountryCode === "RO"
    );
    try {
      console.time("Fetching stock prices from RO...");
      const roStockPriceList = await getLastROStockPrice(roWatchList);
      console.timeEnd("Fetching stock prices from RO...");
      finalStockPriceList.push(...roStockPriceList);

    } catch (error) {
      console.error(error)
    }
  }

  if (isNYSEMarketOpen()) {
    const usWatchList = watchList.filter(
      (asset) => asset.exchangeCountryCode === "US"
    );
    try {
      console.time("Fetching stock prices from US...");
      const usStockPriceList = await getLastUSStockPrice(usWatchList);
      console.timeEnd("Fetching stock prices from US...");

      finalStockPriceList.push(...usStockPriceList);
    } catch (error) {
      console.error(error)
    }
  }

  return finalStockPriceList.sort((asset1, asset2) =>
    asset1.symbol.localeCompare(asset2.symbol)
  );
}
export { getStockPrice };
