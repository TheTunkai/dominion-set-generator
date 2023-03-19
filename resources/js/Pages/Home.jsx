import { Head } from "@inertiajs/react";
import InfoCard from "@/Components/InfoCard";
import MainLayout from "@/layouts/MainLayout";

export default function Home() {
    const pageInfos = [
        {
            link: "/database",
            title: "Database",
            text: "Look for cards that do something you need in your own set or just learn about new cards.",
        },
        {
            link: "/library",
            title: "Library",
            text: "Search for card sets with a specific card or just scroll through fun sets to play with.",
        },
        {
            link: "/generator",
            title: "Generator",
            text: "Generate card sets with your favorite card/s or generate a completely new set.",
        },
    ];

    const infoCards = pageInfos.map((pageInfo) => {
        return (
            <InfoCard
                key={pageInfo.title}
                link={pageInfo.link}
                title={pageInfo.title}
                text={pageInfo.text}
            />
        );
    });

    return (
        <>
            <main className="h-screen flex flex-col items-center justify-center p-24">
                <div className="flex flex-col gap-4 border-emerald-700 border-2 hover:border-emerald-600 transition duration-75 hover:border-opacity-80 w-10/12 mb-16 p-4 rounded-lg bg-emerald-500 bg-opacity-70">
                    <h3 className="font-semibold text-3xl">
                        What this is about
                    </h3>
                    <p className="text-lg">
                        This web app is made for people who are bored of playing
                        with the same Dominion card sets. It has a database to
                        look for cards and filter them based on attributes. The
                        libraries database has a collection of card sets that my
                        girlfriend and I found to be fun to play with. The
                        generator is the heart of this app and uses a ...
                        algorithm to find cards that play well in a set based on
                        set ratings.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-4">{infoCards}</div>
            </main>
        </>
    );
}

Home.layout = (page) => <MainLayout children={page} title="Home" />;
