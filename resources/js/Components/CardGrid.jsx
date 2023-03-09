import { Image, Card, Overlay } from "@mantine/core";

export default function CardGrid(props) {
    const cardElements = props.cards.map((card) => (
        <Card
            key={card.id}
            radius="md"
            shadow="sm"
            className="flex justify-center relative bg-emerald-500 bg-opacity-30"
        >
            <Image
                src={card.image}
                maw={200}
                radius="sm"
                alt={`${card.name} card image`}
            />
            <div className="top-100 rounded-lg transition ease-in-out duration-200 absolute bg-emerald-700 hover:top-0 hover:backdrop-blur-sm hover:bg-opacity-40 bg-opacity-0 h-full w-full">
                <div className="transition duration-200 opacity-0 hover:opacity-100 h-full w-full text-white font-medium flex flex-col gap-2 justify-center pl-4">
                    <span>Card name: {card.name}</span>
                    <span>Card cost: {card.cost}</span>
                    <span>
                        Card types:{" "}
                        {JSON.parse(card.types).map((type, index) => (
                            <span
                                key={`${type}-${index}`}
                                className="px-2 mr-2 bg-emerald-400 bg-opacity-50 rounded-full text-center"
                            >
                                {type}
                            </span>
                        ))}
                    </span>
                    <span>
                        Card effects:{" "}
                        {JSON.parse(card.effects).map((effect, index) => (
                            <span
                                key={`${effect}-${index}`}
                                className="px-2 mr-1 bg-emerald-400 bg-opacity-50 rounded-full text-center"
                            >
                                {effect}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </Card>
    ));

    return <div className="grid grid-cols-4 gap-6">{cardElements}</div>;
}
