import Movie from '../models/movieModel.js'


export const createMovie = async (req, res) => {
    const newMovie = new Movie(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updateMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedMovie);
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(404).json("Movie Does not Exist")
    }
}

export const deleteMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("The movie has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    }else{
        res.status(404).json("Movie Does not Exist")
    }
}

export const getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
        try {
            res.status(200).json(movie);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(404).json("Movie Does not Exist")
    }
}

export const randomMovie = async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === "series") {
            movie = await Movie.aggregate([
                { $match: { isSeries: true } },
                { $sample: { size: 1 } },
            ]);
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } },
            ]);
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
}