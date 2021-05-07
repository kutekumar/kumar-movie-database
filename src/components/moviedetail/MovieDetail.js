import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  fetchCasts,
  fetchMovieDetail,
  fetchMovieVideos,
  fetchSimilarMovie,
} from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const MovieDetail = ({ match }) => {
  let params = match.params;
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };
    fetchAPI();
  }, [params.id]);

  genres = detail.genres;
  const MoviePlayerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000", fontWeight: "bolder" }}>
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };
  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <LazyLoadImage
          effect="blur"
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        />
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}>
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card" onClick={() => window.scrollTo(0, 0)}>
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
  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePlayerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}></MoviePlayerModal>
        <div className="col text-center" style={{ position: "relative" }}>
          <LazyLoadImage
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          />
          <div className="carousel-center" style={{ position: "absolute" }}>
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{
                fontSize: 95,
                color: "#50b3d2",
                textAlign: "center",
                cursor: "pointer",
              }}></i>
          </div>
          <div
            className="carousel-caption"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              padding: "1rem",
              position: "absolute",
              textAlign: "center",
              fontSize: 20,
            }}>
            {detail.title}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.vote_average}
              size={20}
              color1={"#50b3d2"}></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#61606b", fontWeight: "bold" }}>OVERVIEW</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bold" }}>RELEASE DATE</p>
          <p style={{ color: "#50b3d2" }}>{detail.release_date}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bold" }}>RUN TIME</p>
          <p style={{ color: "#50b3d2" }}>{detail.runtime}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bold" }}>BUDGET</p>
          <p style={{ color: "#50b3d2" }}>{detail.budget}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bold" }}>HOMEPAGE</p>
          <p style={{ color: "#50b3d2" }}>
            <Link to={detail.homepage}>{detail.homepage}</Link>
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">CASTS</ul>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">SIMILAR MOVIES</ul>
        </div>
      </div>
      <div className="row mt-3">{similarMovieList}</div>
    </div>
  );
};

export default MovieDetail;
