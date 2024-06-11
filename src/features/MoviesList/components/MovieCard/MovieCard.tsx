// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Movie } from "../../interfaces/Movie";
import Button from "../../../common/components/Button/Button";
import { useNavigate } from "react-router-dom";
import styles from './MovieCard.module.scss';

interface Props {
    movie: Movie;
}

export const MovieCard: React.FC<Props> = ({ movie }) => {
    const navigate = useNavigate();
    return (
        <Card className={styles["movie-card"]} >
            <Card.Img variant="top" src={movie.poster} />
            <Card.Body>
                <Card.Title>{movie.name}</Card.Title>
                <Card.Text>{movie.genres.join(', ')}</Card.Text>
                <Button onClick={() => navigate(movie._id)}>Go to</Button>
            </Card.Body>
        </Card>
    );
};
