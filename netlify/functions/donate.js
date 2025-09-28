const { Client } = require("pg");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { amount } = JSON.parse(event.body);

    if (!amount || isNaN(amount)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid amount" }) };
    }

    const client = new Client({
      connectionString: process.env.DATABASE_URL, // Neon DB connection string
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();
    await client.query("INSERT INTO donations (amount) VALUES ($1)", [amount]);
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
