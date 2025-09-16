const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample products
const products = [
  { id: 1, name: "iPhone 14", price: 799 },
  { id: 2, name: "Samsung Galaxy S23", price: 699 },
  { id: 3, name: "OnePlus 11", price: 499 },
  { id: 4, name: "Google Pixel 8", price: 599 },
  { id: 5, name: "Xiaomi Redmi Note 12", price: 299 },
];

// GET /products
app.get("/products", (req, res) => {
  res.json(products);
});

// POST /recommend
// app.post("/recommend", async (req, res) => {
//   const { query } = req.body;
//   if (!query) return res.status(400).json({ message: "Query required" });

//   // MOCK logic if no API key
//   if (!process.env.OPENAI_API_KEY) {
//     const recommended = products.filter(
//       (p) => query.toLowerCase().includes("phone") && p.price <= 500
//     );
//     return res.json(recommended);
//   }

app.post("/recommend", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ message: "Query required" });

  // MOCK logic (works without OpenAI key)
  const recommended = products.filter(
    (p) =>
      query.toLowerCase().includes("phone") &&
      p.price <= 500
  );

  return res.json(recommended);



  // Real AI recommendation using OpenAI
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Recommend products from this list ${JSON.stringify(
              products
            )} based on: ${query}`,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;

    const recommended = products.filter((p) => aiMessage.includes(p.name));

    res.json(recommended);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
