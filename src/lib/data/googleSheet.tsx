const csv2json = require("csvtojson");

// export const GOOGLE_SHEET_DATA: string = process.env.GOOGLE_SHEET_DATA || "";
export const GOOGLE_SHEET_DATA =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTlUzK0Mk7J8E2iPs9cjL0noYOFKXCRpGzT9N-s2aMvKTj2foJYvYyGXNTG_sg7l2cmQHRatsmjaM2J/pub?gid=0";

export default async function getData() {
  const url = GOOGLE_SHEET_DATA;
  const csv = "&single=true&output=csv&headers=0";
  const skipFirstRow = "&range=A2:ZZ";
  const result = await fetch(url + csv + skipFirstRow);
  const data = await result.text();
  return csv2json().fromString(data);
}
