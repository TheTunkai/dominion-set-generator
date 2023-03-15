import CardGrid from "./CardGrid";

export default function CardSetDisplay(props) {
    return (
        <div>
            <h3>
                {props.title} by {props.author}
            </h3>
            <CardGrid cards={props.cards} />
        </div>
    );
}
