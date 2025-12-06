router.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    const numberQuery = Number(query);

    const db = getDB();

    const results = await db.collection("lessons").find({
      $or: [
        { subject: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { tutor: { $regex: query, $options: "i" } },
        { book: { $regex: query, $options: "i" } },

        ...(isNaN(numberQuery) ? [] : [
            { price: numberQuery },
            { space: numberQuery }
        ])
      ]
    }).toArray();

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});
