import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";


interface SymbolPageDetails {
  "Date/time": string;
  "Last price": string;
  "Open price": string;
  "High price": string;
  "Low price": string;
  "Avg. price": string;
  "52 weeks high": string;
  "52 weeks low": string;
}

async function fetchSymbolPage(symbol: string) {
  const response = await fetch(
    `https://www.bvb.ro/FinancialInstruments/Details/FinancialInstrumentsDetails.aspx?s=${symbol}`
  );
  const responseData = await response.text();

    const selector = cheerio.load(responseData);

  const table = selector("#ctl00_body_ctl02_PricesControl_dvCPrices");
  const data: SymbolPageDetails = {} as SymbolPageDetails;
  table.find("tr").each(function (i, row) {
    const name = selector(row).find("td:nth-child(1)");
    const value = selector(row).find("td:nth-child(2)");
    const key = name.text().trim();
    data[key as keyof SymbolPageDetails] = value.text().trim();
  });

  return data;
}
fetchSymbolPage("TLV").then(console.log)