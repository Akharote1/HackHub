import Card from "react-bootstrap/Card";
import Layout from "./Layout";
export default function Chip({name}) {
    return(
        <span className="bg-white m-2 w-auto border rounded-3 p-2 pt-1 pb-1">
            {name}
        </span>
    );
}
