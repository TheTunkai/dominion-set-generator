import {Card, Image} from "@mantine/core";

export default function CardSetGrid(props) {
    const cardElements = props.cardSets.map((set) => (
        <Card
            key={set.id}
            radius="md"
            shadow="sm"
            className="flex justify-center items-center flex-col relative bg-emerald-500 bg-opacity-30"
        >
            <h3 className="text-emerald-50 text-xl font-medium">{set.title}</h3>
            <h5 className="text-emerald-50 text-md font-normal">
                Author: {set.author}
            </h5>
            <div className="grid grid-cols-5 gap-2 mt-5">
                {set.cards.map(card => <Image
                    src={card.image}
                    maw={60}
                    radius="sm"
                    alt={`${card.name} card image`}
                />)}
            </div>
        </Card>
    ));

    return <div className="grid grid-cols-3 gap-6">{cardElements}</div>;
}
