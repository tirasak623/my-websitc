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

/**
 * ฟอร์แมตราคาพร้อมหน่วยราคาให้อ่านง่าย เช่น "฿120 / บาทต่อแพ็ก"
 * คืนค่า "สอบถามราคา" เมื่อไม่มีราคาแน่นอน เพื่อไม่ให้ต้องสมมติราคาขึ้นมา
 */
export function formatPriceWithUnit(
  price: number | null | undefined,
  priceUnit?: string
): string {
  if (price === null || price === undefined) {
    return "สอบถามราคา";
  }
  return priceUnit ? `${formatBaht(price)} (${priceUnit})` : formatBaht(price);
}
