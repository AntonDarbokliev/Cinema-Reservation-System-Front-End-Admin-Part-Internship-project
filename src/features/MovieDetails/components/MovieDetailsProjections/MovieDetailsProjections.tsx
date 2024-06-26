import { MovieDetailsProjection } from "../MovieDetailsProjection/MovieDetailsProjection";
import Button from "../../../common/components/Button/Button";
import styles from "./MovieDetailsProjections.module.scss";
import { useState } from "react";
import { AddEditProjectionModal } from "../AddEditProjectionModal/AddEditProjectionModal";
import { Movie } from "../../../MoviesList/interfaces/Movie";

interface Props {
    movie: Movie;
    setMovie: React.Dispatch<React.SetStateAction<Movie | undefined>>;
}

export const MovieDetailsProjections: React.FC<Props> = ({ movie, setMovie }) => {
    const [showAddProjection, setShowAddProjectionModal] = useState(false);
    return (
        <>
            <h1>
                Projections <Button onClick={() => setShowAddProjectionModal(true)}>Add a Projection</Button>
            </h1>
            <AddEditProjectionModal
                setMovie={setMovie}
                show={showAddProjection}
                showAddProjectionModal={setShowAddProjectionModal}
            ></AddEditProjectionModal>
            <div className={styles["projections-list"]}>
                {movie.projections &&
                    movie.projections.length > 0 &&
                    movie.projections.map((prj) => <MovieDetailsProjection key={prj._id} projection={prj} />)}
            </div>
            {!movie.projections ||
                (movie.projections.length == 0 && (
                    <>
                        <p>No Projections found</p>
                    </>
                ))}
        </>
    );
};
