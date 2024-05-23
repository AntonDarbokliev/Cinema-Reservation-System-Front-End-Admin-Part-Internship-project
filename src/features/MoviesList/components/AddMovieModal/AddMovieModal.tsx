import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { hideAddMovieModal } from "../../../../store/addMovieModal/addMovieModalSlice";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../../common/components/Button/Button";
import { Rating } from "../../interfaces/Rating";
import { useState } from "react";
import { Genre } from "../../interfaces/Genre";
import { useForm } from "../../../common/hooks/useForm";
import { useCreateMovie } from "../../hooks/useCreateMovie";

interface Props {
    show: boolean;
}

export const AddMovieModal: React.FC<Props> = ({ show }) => {
    const dispatch = useDispatch();
    const [actors, setActors] = useState<string[]>([""]);
    const [genres, setGenres] = useState<Genre[]>([Genre.ACTION]);
    const [subtitles, setSubtitles] = useState<string[]>([""]);
    const [file, setFile] = useState<File | null>(null);
    const { createMovieHandler } = useCreateMovie();

    const { formValues, onChangeHandler } = useForm({
        language: "",
        name: "",
        length: "",
        director: "",
        description: "",
        production: "",
        rating: "",
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
                <Button type="button" onClick={() => dispatch(hideAddMovieModal())}>
                    Close
                </Button>
                <Button
                    type="button"
                    onClick={async () => {
                        await addMovieHandler();
                        dispatch(hideAddMovieModal());
                    }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
