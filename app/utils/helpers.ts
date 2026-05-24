/**
 * General helper utilities
 * Provides common functions used across multiple pages/components
 */

/**
 * Format number with Indonesian locale (thousand separators)
 * @param num - Number to format
 * @returns Formatted string (e.g., "1.234.567")
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("id-ID").format(num);
};

/**
 * Generate URL-friendly slug from a string
 * @param text - Text to convert to slug
 * @returns Slug string (e.g., "hello-world-123")
 */
export const generateSlug = (text: string): string => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Calculate total stock from variant stock relations
 * Uses available stock (qty - reserved_qty) to match backend independent stock management
 * @param variant - Variant object with stock_relations, stockRelations, or store_stocks
 * @returns Formatted total stock string
 */
export const getVariantTotalStock = (variant: any): string => {
  // If variant has stock accessor (from backend), use it directly
  if (variant.stock !== undefined && variant.stock !== null) {
    return formatNumber(variant.stock);
  }

  const stockRelations =
    variant.stock_relations ||
    variant.stockRelations ||
    variant.store_stocks ||
    [];

  if (!Array.isArray(stockRelations) || stockRelations.length === 0) {
    return formatNumber(0);
  }

  // Calculate available stock (qty - reserved_qty) for each store
  const totalStock = stockRelations.reduce((sum: number, stock: any) => {
    const qty = stock.qty || 0;
    const reservedQty = stock.reserved_qty || 0;
    const availableQty = Math.max(0, qty - reservedQty);
    return sum + availableQty;
  }, 0);

  return formatNumber(totalStock);
};

/**
 * Format currency with Indonesian Rupiah format
 * @param amount - Amount to format
 * @returns Formatted string (e.g., "Rp 1.234.567")
 */
export const formatCurrency = (amount: number): string => {
  return `Rp ${formatNumber(amount)}`;
};
