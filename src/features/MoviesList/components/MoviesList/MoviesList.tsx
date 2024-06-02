import { useSelector } from "react-redux";
import Container from "../../../common/components/Container/Container";
import { IRootState } from "../../../../store/store";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesList.module.scss";
import { AddMovieModal } from "../AddMovieModal/AddMovieModal";
export const MoviesList = () => {
    const cinema = useSelector((state: IRootState) => state.cinema);
    const modalState = useSelector((state: IRootState) => state.addMovieModal.show);
    return (
        <Container>
            <AddMovieModal show={modalState}></AddMovieModal>
            <div className={styles["movies-list"]}>
                {cinema.movies.map((m) => (
                    <MovieCard movie={m} key={m._id} />
                ))}
            </div>
        </Container>
    );
};
