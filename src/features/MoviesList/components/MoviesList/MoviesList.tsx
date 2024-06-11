import { useSelector } from "react-redux";
import Container from "../../../common/components/Container/Container";
import { IRootState } from "../../../../store/store";
import { MovieCard } from "../MovieCard/MovieCard";
import styles from "./MoviesList.module.scss";
import { AddEditMovieModal } from "../AddEditMovieModal/AddEditMovieModal";
export const MoviesList = () => {
    const cinema = useSelector((state: IRootState) => state.cinema);
    const modalState = useSelector((state: IRootState) => state.addEditMovieModal.show);
    return (
        <Container>
            <AddEditMovieModal show={modalState}></AddEditMovieModal>
            <div className={styles["movies-list"]}>
                {cinema.movies.map((m) => (
                    <MovieCard movie={m} key={m._id} />
                ))}
            </div>
        </Container>
    );
};
