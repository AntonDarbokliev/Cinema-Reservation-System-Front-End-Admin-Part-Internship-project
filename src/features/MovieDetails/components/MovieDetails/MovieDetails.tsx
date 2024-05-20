import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { useParams } from "react-router-dom";
import Container from "../../../common/components/Container/Container";
import { Image } from "react-bootstrap";
import styles from "./MovieDetails.module.scss";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieDetailsTable } from "../MovieDetailsTable/MovieDetailsTable";
import { MovieDetailsProjections } from "../MovieDetailsProjections/MovieDetailsProjections";

export const MovieDetails = () => {
    const params = useParams();
    const movie = useSelector((state: IRootState) => state.cinema.movies.find((m) => m._id == params.movieId));

    return (
        <Container>
            {movie && (
                <div className={styles["movie-details"]}>
                    <h1>{movie?.name}</h1>
                    <div className={styles["movie-desc-poster"]}>
                        <div className={styles["description"]}>
                            <p>{movie?.description}</p>
                            <h2>
                                <FontAwesomeIcon icon={faClock} /> {movie?.length} min
                            </h2>
                            <MovieDetailsTable movie={movie} />
                        </div>
                        <div className={styles["movie-poster"]}>
                            <Image src={movie?.poster} fluid />
                        </div>
                    </div>
                    <MovieDetailsProjections/>
                </div>
            )}
        </Container>
    );
};
