import { CinemasList } from "../components/CinemasList/CinemasList";
import { useAllCinemas } from "../components/hooks/useAllCinemas";

export const CinemaListContainer = () => {
    const { cinemas } = useAllCinemas();

    return (
        <div className="container" >
            <h1 style={{textAlign: "center", marginBottom: "3rem"}}>Cinemas</h1>
            <CinemasList cinemas={cinemas} />
        </div>
    );
};
