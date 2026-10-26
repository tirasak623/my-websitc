const thbFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

/** ฟอร์แมตตัวเลขเป็นสกุลเงินบาท เช่น ฿120 */
export function formatBaht(amount: number): string {
  return thbFormatter.format(amount);
}

/** ฟอร์แมตราคาต่อชิ้น เช่น "฿5 / ชิ้น" สำหรับใช้เป็นป้ายราคาหลักบนการ์ดสินค้า */
export function formatPricePerPiece(pricePerPiece: number): string {
  return `${formatBaht(pricePerPiece)} / ชิ้น`;
}
