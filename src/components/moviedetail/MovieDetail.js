import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { fetchMovieDetail } from "../../service";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const MovieDetail = ({ match }) => {
  let params = match.params;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
    };
    fetchAPI();
  }, [params.id]);

  return (
    <div className="container">
      <div className="row mt-2">
        <div className="col text-center" style={{ width: "100%" }}>
          <LazyLoadImage
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          />
          <div>
            <i
              className="far fa-play-circle"
              style={{
                fontSize: 95,
                color: "#50b3d2",
                textAlign: "center",
                cursor: "pointer",
              }}></i>
          </div>
          <div style={{ background: "black", padding: "1rem" }}>
            {detail.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
