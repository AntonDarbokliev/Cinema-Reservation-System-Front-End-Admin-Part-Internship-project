import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { hideAddEditMovieModal } from "../../../../store/addEditMovieModal/addEditMovieModalSlice";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../common/components/Button/Button";
import { Rating } from "../../interfaces/Rating";
import { useState } from "react";
import { Genre } from "../../interfaces/Genre";
import { useForm } from "../../../common/hooks/useForm";
import { useCreateMovie } from "../../hooks/useCreateMovie";
import { Movie } from "../../interfaces/Movie";
import { useEditMovie } from "../../hooks/useEditMovie";

interface Props {
    show: boolean;
    movie?: Movie;
    setMovie?: React.Dispatch<React.SetStateAction<Movie>>;
}

export const AddEditMovieModal: React.FC<Props> = ({ show, movie, setMovie }) => {
    const dispatch = useDispatch();
    const [actors, setActors] = useState<string[]>(movie?.actors ?? [""]);
    const [genres, setGenres] = useState<Genre[]>(movie?.genres ?? [Genre.ACTION]);
    const [subtitles, setSubtitles] = useState<string[]>(movie?.subtitles ?? [""]);
    const [file, setFile] = useState<File | null>(null);
    const { createMovieHandler } = useCreateMovie();
    const { editMovieHandler } = useEditMovie();

    const { formValues, onChangeHandler } = useForm({
        language: movie?.language ?? "",
        name: movie?.name ?? "",
        length: movie?.length ?? "",
        director: movie?.director ?? "",
        description: movie?.description ?? "",
        production: movie?.production ?? "",
        rating: movie?.rating ?? "",
    });

    const handleChange = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        stateSetter: React.Dispatch<React.SetStateAction<string[]>> | React.Dispatch<React.SetStateAction<Genre[]>>,
        state: "actor" | "genre" | "subtitle"
    ) => {
        let newState: string[] = [];
        if (state === "actor") {
            newState = [...actors];
        } else if (state === "genre") {
            newState = [...genres];
        } else if (state === "subtitle") {
            newState = [...subtitles];
        }
        newState[index] = event.target.value;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // Ignoring here because newState is always of type string[] and a Genre type is also a string.
        stateSetter(newState);
    };

    const handleAdd = (state: "actor" | "genre" | "subtitle") => {
        if (state === "actor") {
            setActors([...actors, ""]);
        } else if (state === "genre") {
            setGenres([...genres, Genre.ACTION]);
        } else if (state === "subtitle") {
            setSubtitles([...subtitles, ""]);
        }
    };

    const handleRemove = (
        state: "actor" | "genre" | "subtitle",
        index: number,
        stateSetter: React.Dispatch<React.SetStateAction<string[]>> | React.Dispatch<React.SetStateAction<Genre[]>>
    ) => {
        let newState: string[] = [];
        if (state === "actor") {
            newState = [...actors].filter((_, i) => i !== index);
        } else if (state === "genre") {
            newState = [...genres];
            newState.splice(index, 1);
        } else if (state === "subtitle") {
            newState = [...subtitles].filter((_, i) => i !== index);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // Ignoring here because newState is always of type string[] and a Genre type is also a string.
        stateSetter(newState);
    };

    const addMovieHandler = async () => {
        if (file) {
            await createMovieHandler({ ...formValues, actors, genres, subtitles, poster: file, rating: formValues.rating as Rating });
        }
    };

    return (
        <Modal show={show} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext1">
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" name="name" value={formValues.name} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={formValues.description}
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext3">
                        <Form.Label column sm="2">
                            Age Rating
                        </Form.Label>
                        <Form.Select
                            name="rating"
                            value={formValues.rating}
                            onChange={(e) => onChangeHandler(e)}
                            aria-label="Default select example"
                        >
                            <option>Select age rating</option>
                            <option value={Rating.RATING_G}>{Rating.RATING_G}</option>
                            <option value={Rating.RATING_PG}>{Rating.RATING_PG}</option>
                            <option value={Rating.RATING_PG13}>{Rating.RATING_PG13}</option>
                            <option value={Rating.RATING_R}>{Rating.RATING_R}</option>
                            <option value={Rating.RATING_NC17}>{Rating.RATING_NC17}</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" as={Row} controlId="formPlaintext4">
                        <Form.Label column sm="2">
                            Length &#40;minutes&#41;
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control type="number" name="length" value={formValues.length} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext5">
                        <Form.Label column sm="2">
                            Director
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="director" value={formValues.director} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext6">
                        <Form.Label column sm="2">
                            Language
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="language" value={formValues.language} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintext7">
                        <Form.Label column sm="2">
                            Production
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control name="production" value={formValues.production} onChange={(e) => onChangeHandler(e)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFile" className="mb-3">
                        <Form.Label column sm="2">
                            Poster
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="file"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Actors</Form.Label>
                        {actors.map((actor, index) => (
                            <Row key={index} className="mb-3">
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        value={actor}
                                        onChange={(e) => handleChange(index, e, setActors, "actor")}
                                        placeholder="Actor Name"
                                    />
                                </Col>
                                <Col sm="2">
                                    {index > 0 && (
                                        <Button type="button" onClick={() => handleRemove("actor", index, setActors)}>
                                            Remove
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        ))}
                        <Button type="button" onClick={() => handleAdd("actor")}>
                            Add Actor
                        </Button>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genres</Form.Label>
                        {genres.map((genre, index) => (
                            <Row key={index} className="mb-3">
                                <Col sm="10">
                                    <Form.Select
                                        value={genre}
                                        onChange={(e) => handleChange(index, e, setGenres, "genre")}
                                        aria-label="defaultSelect"
                                    >
                                        {Object.values(Genre).map((g) => (
                                            <option key={g} value={g}>
                                                {g}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col sm="2">
                                    {index > 0 && (
                                        <Button type="button" onClick={() => handleRemove("genre", index, setGenres)}>
                                            Remove
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        ))}
                        <Button type="button" onClick={() => handleAdd("genre")}>
                            Add Genre
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Subtitles</Form.Label>
                        {subtitles.map((subtitle, index) => (
                            <Row key={index} className="mb-3">
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        value={subtitle}
                                        onChange={(e) => handleChange(index, e, setSubtitles, "subtitle")}
                                        placeholder="Subtitle"
                                    />
                                </Col>
                                <Col sm="2">
                                    {index > 0 && (
                                        <Button type="button" onClick={() => handleRemove("subtitle", index, setSubtitles)}>
                                            Remove
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        ))}
                        <Button type="button" onClick={() => handleAdd("subtitle")}>
                            Add Subtitle
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => dispatch(hideAddEditMovieModal())}>
                    Close
                </Button>
                {!movie && (
                    <Button
                        type="button"
                        onClick={async () => {
                            await addMovieHandler();
                            dispatch(hideAddEditMovieModal());
                        }}
                    >
                        Add
                    </Button>
                )}
                {movie && (
                    <Button
                        type="button"
                        onClick={async () => {
                            if (movie && setMovie) {
                                const movie = await editMovieHandler({
                                    ...formValues,
                                    actors,
                                    genres,
                                    poster: file as File,
                                    subtitles,
                                    rating: formValues.rating as Rating,
                                });
                                setMovie((state) => ({ ...state, ...movie! }));
                            } else {
                                await addMovieHandler();
                            }

                            dispatch(hideAddEditMovieModal());
                        }}
                    >
                        Edit
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};
