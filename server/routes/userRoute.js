import express from "express";
import { deleteUser, getAllUsers, getStats, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../verifyToken.js";


const router = express.Router()

//UPDATE
router.put('/:id', verifyUser, updateUser)

//DELETE
router.delete("/:id", verifyUser,deleteUser);

//GET
router.get("/find/:id",verifyAdmin,getUser);

//GET ALL
router.get("/",verifyAdmin,getAllUsers);

//GET USER STATS
router.get("/stats", verifyAdmin,getStats);

export default router;