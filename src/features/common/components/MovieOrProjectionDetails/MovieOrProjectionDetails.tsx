import Container from "../Container/Container";
import { Image } from "react-bootstrap";
import styles from "./MovieOrProjectionDetails.module.scss";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Projection } from "../../../MovieDetails/interfaces/Projection";
import { Movie } from "../../../MoviesList/interfaces/Movie";
import { MovieDetailsTable } from "../../../MovieDetails/components/MovieDetailsTable/MovieDetailsTable";
import { MovieDetailsProjections } from "../../../MovieDetails/components/MovieDetailsProjections/MovieDetailsProjections";
import { ProjectionDetailsTable } from "../../../ProjectionDetails/components/ProjectionDetailsTable/ProjectionDetailsTable";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { AddEditMovieModal } from "../../../MoviesList/components/AddEditMovieModal/AddEditMovieModal";
import { IRootState } from "../../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { showAddEditMovieModal } from "../../../../store/addEditMovieModal/addEditMovieModalSlice";

interface Props {
    movie: Movie;
    setMovie: React.Dispatch<React.SetStateAction<Movie>>;
    projection?: Projection;
}

export const MovieOrProjectionDetails: React.FC<Props> = ({ movie, projection, setMovie }) => {
    const navigate = useNavigate();
    const modalState = useSelector((state: IRootState) => state.addEditMovieModal.show);
    const dispatch = useDispatch();

    return (
        <Container>
            <AddEditMovieModal setMovie={setMovie} movie={movie} show={modalState} />
            {movie && (
                <div className={styles["details"]}>
                    <h1>{movie.name}</h1>
                    <Button onClick={() => dispatch(showAddEditMovieModal())}>Edit</Button>
                    <div className={styles["desc-poster"]}>
                        <div className={styles["description"]}>
                            {!projection && (
                                <>
                                    <p>{movie.description}</p>
                                    <h2>
                                        <FontAwesomeIcon icon={faClock} /> {movie.length} min
                                    </h2>
                                    <MovieDetailsTable movie={movie} />
                                </>
                            )}
                            {projection && <ProjectionDetailsTable projection={projection} />}
                        </div>
                        <div className={styles["poster"]}>
                            <Image src={movie.poster} fluid alt={movie.name} />
                        </div>
                    </div>
                    {!projection && <MovieDetailsProjections />}
                    {projection && (
                        <>
                            <Button onClick={() => navigate("hall")}>Reserve/Buy a Seat</Button>
                        </>
                    )}
                </div>
            )}
        </Container>
    );
};
