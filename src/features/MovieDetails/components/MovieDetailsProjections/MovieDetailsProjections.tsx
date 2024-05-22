import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { useParams } from "react-router-dom";
import { MovieDetailsProjection } from "../MovieDetailsProjection/MovieDetailsProjection";
import Button from "../../../common/components/Button/Button";

export const MovieDetailsProjections = () => {
    const params = useParams();
    const cinema = useSelector((state: IRootState) => state.cinema);
    const projections = cinema?.projections.filter((prj) => prj.movie == params.movieId);
    return (
        <>
            <h1>
                Projections <Button>Add a Projection</Button>
            </h1>
            {projections && projections.length > 0 && projections.map((prj) => <MovieDetailsProjection key={prj._id} projection={prj} />)}
            {!projections ||
                (projections.length == 0 && (
                    <>
                        <p>No Projections found</p>
                    </>
                ))}
        </>
    );
};
