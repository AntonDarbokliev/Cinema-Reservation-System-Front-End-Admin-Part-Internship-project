import { MovieOrProjectionDetails } from "../../../common/components/MovieOrProjectionDetails/MovieOrProjectionDetails";
import { useProjection } from "../../hooks/useProjection";

export const ProjectionDetails = () => {
    const { projection } = useProjection();
    return <>{projection && <MovieOrProjectionDetails movie={projection?.movie} projection={projection}></MovieOrProjectionDetails>}</>;
};
