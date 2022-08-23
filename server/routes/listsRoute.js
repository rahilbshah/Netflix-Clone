import express from "express";
import { createList, deleteList, getList } from "../controllers/listsController.js";
import { verifyAdmin, verifyUser } from "../verifyToken.js";

const router = express.Router()

//CREATE
router.post("/", verifyAdmin,createList);

//DELETE
router.delete("/:id",verifyAdmin,deleteList);

//GET
router.get("/",verifyUser,getList);

export default router;