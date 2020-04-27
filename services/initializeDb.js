import axios from "axios";
import schema from "../db/schema";
//populate genre table with available genres
async function initializeGenre() {
  try {
    const output = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.tmdbKey}&language=en-US`
    );
    schema.populateGenre(output.data.genres);
  } catch (e) {
    console.log(e);
    return;
  }
}
//populate table with list of top rate movies
async function initializeTopMovie() {
  try {
    const output = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.tmdbKey}&language=en-US&page=1`
    );
    const movieArr = output.data.results.map((movie) => ({
      movie_id: movie.id,
      title: movie.title,
      popularity: movie.popularity,
      adult: movie.adult,
    }));
    //fetch posters of top rated movies and each movie has at least one poster
    const imagesOfMovies = await Promise.all(
      movieArr.map(async (movie) => {
        const imagePathRespone = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.movie_id}/images?api_key=${process.env.tmdbKey}`
        );
        return imagePathRespone.data.backdrops;
      })
    );

    for (const [i, imagesOfMovie] of imagesOfMovies.entries()) {
      movieArr[i].image_path = imagesOfMovie.map(
        (image) => "https://image.tmdb.org/t/p/original" + image.file_path //image.file_path is not the whole url
      );
    }

    schema.populateTopMovie(movieArr);
  } catch (e) {
    console.log(e);
    return;
  }
}

export default { initializeGenre, initializeTopMovie };
