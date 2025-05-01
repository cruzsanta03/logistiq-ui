export default function useQuoteCalculations() {
  return {
    calculateTotals: (form = {}) => ({
      accessorialTotal: 0,
      baseRate: 0,
      manualAdjustment: 0,
      discount: 0,
      totalRate: 0,
      validThrough: new Date().toISOString()
    }),
    formatCurrency: (value: any) => {
      const num = typeof value === "number" ? value : parseFloat(value) || 0;
      return `$${num.toFixed(2)}`;
    },
    generateQuoteHtml: () => `
      <div style="font-family: sans-serif;">
        <h2>Quote Preview</h2>
        <p>This is a placeholder HTML quote preview.</p>
      </div>
    `
  };
}
