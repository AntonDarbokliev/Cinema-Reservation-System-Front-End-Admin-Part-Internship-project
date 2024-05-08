import Button  from "react-bootstrap/Button";

interface Props {
    text: string;
}

const ButtonC: React.FC<Props> = (props) => {
    return <Button type="submit">{props.text}</Button>;
};

export default ButtonC;
