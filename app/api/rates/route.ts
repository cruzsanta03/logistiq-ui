export async function GET() {
  return new Response(
    JSON.stringify([
      { miles: 100, baseRate: 200 },
      { miles: 200, baseRate: 350 },
      { miles: 300, baseRate: 500 }
    ]),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
