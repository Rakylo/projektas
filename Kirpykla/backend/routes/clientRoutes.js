import express from "express";
import {
  addNewClients,
  deleteClientById,
  getAllClients,
  getClientById,
  updateClientById,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getAllClients);

router.get("/get/:id", getClientById);

router.post("/post", addNewClients);

router.delete("/delete/:id", deleteClientById);

router.put("/update/:id", updateClientById);

export default router;
