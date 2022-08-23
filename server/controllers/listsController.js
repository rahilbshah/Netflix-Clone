import List from "../models/listModel.js";
import Movie from "../models/movieModel.js";


export const createList = async (req, res) => {
    const movies = await Movie.find({isSeries:req.body.type==="series"? true : false ,genre:req.body.genre})
    const movieId =movies.map((movie)=>{
        return movie._id
    })   
    const newList = new List({...req.body,content:movieId});
    try {
        const savedList = await newList.save();
        res.status(200).json(savedList);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteList = async (req, res) => {
    const list = await List.findById(req.params.id);
    if(list){
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been delete...");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(404).json("List Does not Exist")
    }
}


export const getList = async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
    try {
        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery, genre: genreQuery } },
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: { size: 10 } }]);
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
}