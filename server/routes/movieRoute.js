import express from "express";
import { createMovie, deleteMovie, getAllMovies, getMovie, randomMovie, updateMovie } from "../controllers/movieController.js";
import { verifyAdmin, verifyUser } from "../verifyToken.js";

const router = express.Router()

//CREATE
router.post("/", verifyAdmin, createMovie);

//UPDATE
router.put("/:id",verifyAdmin,updateMovie);

//DELETE

router.delete("/:id",verifyAdmin,deleteMovie);

//GET

router.get("/find/:id",verifyUser,getMovie);

//GET RANDOM

router.get("/random", verifyUser,randomMovie);

//GET ALL

router.get("/",verifyAdmin,getAllMovies);


export default router;