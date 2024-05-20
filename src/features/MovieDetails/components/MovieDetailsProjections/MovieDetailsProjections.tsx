import { useSelector } from "react-redux";
import { IRootState } from "../../../../store/store";
import { useParams } from "react-router-dom";
import { MovieDetailsProjection } from "../MovieDetailsProjection/MovieDetailsProjection";
import Button from "../../../common/components/Button/Button";

export const MovieDetailsProjections = () => {
    const params = useParams();
    const movie = useSelector((state: IRootState) => state.cinema.movies.find((m) => m._id == params.movieId));
    const projections = movie?.projections;
    return (
        <>
            
            <h1>Projections <Button>Add a Projection</Button></h1>
            {projections && projections.length > 0 && projections.map((prj) => <MovieDetailsProjection projection={prj} />)}
            {!projections ||
                (projections.length == 0 && (
                    <>
                        <p>No Projections found</p>
                    </>
                ))}
        </>
    );
};
