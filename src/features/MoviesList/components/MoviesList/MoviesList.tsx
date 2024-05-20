import { useSelector } from "react-redux";
import Container from "../../../common/components/Container/Container";
import { IRootState } from "../../../../store/store";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesList.module.scss";
export const MoviesList = () => {
    const cinema = useSelector((state: IRootState) => state.cinema);
    return (
        <Container>
            <div className={styles["movies-list"]}>
                {cinema.movies.map((m) => (
                    <MovieCard movie={m} key={m._id} />
                ))}
            </div>
        </Container>
    );
};
