import { Router } from "express";
import axios from "axios";
import queries from "../db/queries";
const router = Router();
router.get("/", async (req, res) => {
  try {
    const output = await queries.testDbConnection();
    res.json(output.rows);
  } catch (e) {
    console.log(e);
  }
});

export default router;
