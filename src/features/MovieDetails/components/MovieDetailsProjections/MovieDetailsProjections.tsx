import { MovieDetailsProjection } from "../MovieDetailsProjection/MovieDetailsProjection";
import Button from "../../../common/components/Button/Button";
import styles from "./MovieDetailsProjections.module.scss";
import { useState } from "react";
import { AddEditProjectionModal } from "../AddEditProjectionModal/AddEditProjectionModal";
import { useProjections } from "../../hooks/useProjections";

export const MovieDetailsProjections = () => {
    const [showAddProjection, setShowAddProjectionModal] = useState(false);
    const { projections, setProjections } = useProjections();
    return (
        <>
            <h1>
                Projections <Button onClick={() => setShowAddProjectionModal(true)}>Add a Projection</Button>
            </h1>
            <AddEditProjectionModal setProjections={setProjections} show={showAddProjection} showAddProjectionModal={setShowAddProjectionModal}></AddEditProjectionModal>
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
