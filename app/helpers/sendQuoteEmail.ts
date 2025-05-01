export default async function sendQuoteEmail(payload: any) {
  console.log("📧 Simulated email send:", payload);
  // Simulate delay like an API call
  return new Promise(resolve => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}
