import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { useParams } from "react-router-dom";
import { MovieDetailsProjection } from "../MovieDetailsProjection/MovieDetailsProjection";
import Button from "../../../common/components/Button/Button";
import styles from './MovieDetailsProjections.module.scss';
import { useState } from "react";
import { AddProjectionModal } from "../AddProjectionModal/AddProjectionModal";

export const MovieDetailsProjections = () => {
    const params = useParams();
    const cinema = useSelector((state: IRootState) => state.cinema);
    const [showAddProjection, setShowAddProjectionModal] = useState(false);
    const projections = cinema?.projections.filter((prj) => prj.movie == params.movieId);
    return (
        <>
            <h1>
                Projections <Button onClick={() => setShowAddProjectionModal(true)}>Add a Projection</Button>
            </h1>
            <AddProjectionModal show={showAddProjection} showAddProjectionModal={setShowAddProjectionModal}></AddProjectionModal>
            <div className={styles["projections-list"]}>
            {projections && projections.length > 0 && projections.map((prj) => <MovieDetailsProjection key={prj._id} projection={prj} />)}
            </div>
            {!projections ||
                (projections.length == 0 && (
                    <>
                        <p>No Projections found</p>
                    </>
                ))}
        </>
    );
};
