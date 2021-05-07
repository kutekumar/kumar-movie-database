import React, { useState, useEffect } from "react";
import {
  fetchGenre,
  fetchMovieByGenre,
  fetchMovies,
  fetchPersons,
  fetchTopratedMovie,
} from "../../service";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

//Lazy Loader
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      setPersons(await fetchPersons());
      setTopRated(await fetchTopratedMovie());
    };

    fetchAPI();
  }, []);

  //Click Genre Event
  const handleGenreClick = async (genre_id) => {
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <div
        key={index}
        style={{ height: 500, width: "100%" }}
        className="carousel-container">
        <div>
          <LazyLoadImage
            style={{ height: 600 }}
            src={item.backPoster}
            alt={item.title}
            effect="blur"
          />
        </div>
        <div className="carousel-center">
          {/* <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#50b3d2" }}></i> */}
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
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}>
          {item.name}
        </button>
      </li>
    );
  });

  const movieList = movieByGenre.slice(0, 10).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <LazyLoadImage
              effect="blur"
              className="img-fluid"
              src={item.poster}
              alt={item.title}
            />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color={"#50b3d2"}></ReactStars>
        </div>
      </div>
    );
  });
  const trendingPersons = persons.slice(0, 4).map((p, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <LazyLoadImage
          effect="blur"
          className="img-fluid rounded-circle mx-auto d-block"
          src={p.profileImg}
          alt={p.name}
        />
        <p className="font-weight-bold text-center">{p.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}>
          Trending for {p.known}
        </p>
      </div>
    );
  });

  const topRatedList = topRated.slice(0, 8).map((item, index) => {
    return (
      <div className="col-md-3 text-center" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <LazyLoadImage
              className="img-fluid"
              src={item.poster}
              alt={item.title}
            />
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Rated: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color={"#50b3d2"}></ReactStars>
        </div>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            useKeyboardArrows={true}
            showArrows={true}>
            {movies}
          </Carousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />
      <p className="font-weight-bold" style={{ color: "#5a606b" }}>
        NEW MOVIES
      </p>

      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>
      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TRENDING PERSON ON THIS WEEK
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>
      <div className="row mt-3">{trendingPersons}</div>
      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />
      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TOP RATED MOVIES
          </p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="float-right">
            <i className="far fa-arrow-alt-circle-right"></i>
          </div>
        </div>
      </div>
      <div className="row mt-3">{topRatedList}</div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />
      <div className="row mt-3 " style={{ width: "100vh" }}>
        <div
          className="col-md-8 col-sm-6"
          style={{
            color: "#5a606b",
            fontSize: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px 20px",
            justifyContent: "center",
          }}>
          <LazyLoadImage
            className="img-fluid rounded-circle mx-auto d-block"
            src="https://cdna.artstation.com/p/users/avatars/000/141/312/large/0f1b840109bed724ca492534f5a2e052.jpg?1450610105"
          />
          <h3>ABOUT ME</h3>
          <p>
            Hi there! My name is Kumar Koirala. I am a web developer and a
            motion graphic designer. My passion is creating something cool and
            fun. I love music and travelling alot. Please check my portoflio
            <a href="https://andrewkumar-portfolio.netlify.app/">My Website</a>
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a
                href="https://youtube.com/c/kutekumar"
                style={{ color: "#50b3d2" }}>
                <i className="fab fa-youtube fa-3x"></i>
              </a>
              <a href="/" style={{ color: "#50b3d2" }}>
                <i className="fab fa-facebook fa-3x"></i>
              </a>
              <a href="/" style={{ color: "#50b3d2" }}>
                <i className="fab fa-instagram fa-3x"></i>
              </a>
              <a href="/" style={{ color: "#50b3d2" }}>
                <i className="fab fa-twitter fa-3x"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
