import { useProjection } from "../../hooks/useProjection";
import { HallLayout } from "../../../HallLayout/components/HallLayout/HallLayout";

export const ProjectionHallLayout = () => {
    const { projection, setProjection } = useProjection();
    return <>{projection && <HallLayout reserveMode={true} projection={projection} setProjection={setProjection} />}</>;
};
