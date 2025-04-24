export async function POST(request) {
  try {
    const body = await request.json();

    console.log("📨 Quote submission received:", body);

    return new Response(JSON.stringify({
      message: "Quote submitted successfully",
      received: body
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("❌ Error processing quote:", err);
    return new Response(JSON.stringify({ error: "Failed to process quote" }), {
      status: 500
    });
  }
}
