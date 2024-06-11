import { MovieOrProjectionDetails } from "../../../common/components/MovieOrProjectionDetails/MovieOrProjectionDetails";
import { useProjection } from "../../hooks/useProjection";

export const ProjectionDetails = () => {
    const { projection, setProjection } = useProjection();
    return <>{projection && <MovieOrProjectionDetails movie={projection?.movie} setProjection={setProjection} projection={projection}></MovieOrProjectionDetails>}</>;
};
