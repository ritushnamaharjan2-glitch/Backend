import express from "express";
import { getDB } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const lessons = await getDB().collection("lessons").find().toArray();
  res.json(lessons);
});

// YOUR SEARCH ROUTE GOES HERE
router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  const number = Number(query);

  const results = await getDB().collection("lessons").find({
    $or: [
      { subject: { $regex: query, $options: "i" } },
      { location: { $regex: query, $options: "i" } },
      { tutor: { $regex: query, $options: "i" } },
      { book: { $regex: query, $options: "i" } },
      ...(isNaN(number) ? [] : [{ price: number }, { space: number }])
    ]
  }).toArray();

  res.json(results);
});

// IMPORTANT FIX ↓↓↓
export default router;
