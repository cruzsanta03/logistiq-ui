export default async function submitQuoteToApi(quoteData: any) {
  const response = await fetch("/api/submit-quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quoteData)
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Quote submission failed")
  }

  return response.json()
}
