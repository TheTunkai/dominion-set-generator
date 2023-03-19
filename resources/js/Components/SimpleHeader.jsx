import { Container, Group, Header } from "@mantine/core";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { Square3Stack3DIcon } from "@heroicons/react/20/solid";

export default function SimpleHeader({ links, currentPageTitle }) {
    const [activePage, setActivePage] = useState(currentPageTitle);

    const items = links.map((link) => {
        return (
            <Link
                key={link.label}
                href={link.link}
                onClick={() => setActivePage(link.label)}
                className={`${
                    link.label === activePage
                        ? "border-b-2 border-b-emerald-300 bg-emerald-300 bg-opacity-10 -mb-0.5 font-semibold"
                        : ""
                } font-medium text-md md:text-lg py-5 px-8 hover:text-white hover:border-b-2 hover:border-b-emerald-300 hover:bg-emerald-300 hover:bg-opacity-10 hover:-mb-0.5 transition duration-75`}
            >
                {link.label}
            </Link>
        );
    });

    return (
        <header className="bg-emerald-500 bg-opacity-70 border-b border-emerald-700 border-opacity-50 shadow-lg">
            <nav className="grid grid-cols-3">
                <Link className="flex flex-col justify-center items-start pl-8" href="/">
                    <Square3Stack3DIcon className="h-8" />
                    DSG
                </Link>
                <div className="flex justify-start">{items}</div>
            </nav>
        </header>
    );
}
