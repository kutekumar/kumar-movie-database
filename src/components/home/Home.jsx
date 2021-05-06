import React, { useState, useEffect } from "react";
import { fetchGenre, fetchMovies } from "../../service";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
    };

    fetchAPI();
  }, []);

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <div key={index} style={{ height: 500, width: "100%" }}>
        <div>
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#50b3d2" }}></i>
        </div>
        <div
          className="carousel-center"
          style={{
            textAlign: "center",
            fontSize: 25,
            marginTop: "200px",
            width: "100%",
            backgroundColor: "black",
          }}>
          {item.title}
        </div>
      </div>
    );
  });

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button type="button" className="btn btn-outline-info">
          {item.name}
        </button>
      </li>
    );
  });
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <Carousel autoPlay infiniteLoop useKeyboardArrows showArrows={true}>
            {movies}
          </Carousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Home;
