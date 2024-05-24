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

interface Props {
    movie: Movie;
    projection?: Projection;
}

export const MovieOrProjectionDetails: React.FC<Props> = ({ movie, projection }) => {
    return (
        <Container>
            {movie && (
                <div className={styles["details"]}>
                    <h1>{movie.name}</h1>
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
                    {projection && <Button>Reserve a Seat</Button>}
                </div>
            )}
        </Container>
    );
};
