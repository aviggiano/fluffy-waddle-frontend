import { Report } from "fluffy-waddle-database";

export function formatAddress(report: Report): string {
  return `https://${report.contract.blockchain.explorer}.deth.net/address/${report.contract.address}`;
}
