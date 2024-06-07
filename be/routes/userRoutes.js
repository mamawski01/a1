import express from "express";
import { getusers } from "./controller/getusers";

const router = express.Router();

router.get("/users", getusers);
