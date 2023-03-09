import {Container, Group, Header} from "@mantine/core";
import {Link} from "@inertiajs/react";
import {useState} from "react";

export default function SimpleHeader({links}) {

    const [activeLink, setActiveLink] = useState(links[0].link);

    const items = links.map(link => {
        return <Link key={link.label}
                     href={link.link}
                     onClick={() => setActiveLink(link.link)}
                     className={`${link.link === activeLink ? 'border-b-2 border-b-emerald-300 bg-emerald-300 bg-opacity-10 -mb-0.5' : ''} font-medium text-lg py-5 px-8 hover:text-white hover:border-b-2 hover:border-b-emerald-300 hover:bg-emerald-300 hover:bg-opacity-10 hover:-mb-0.5 transition duration-75`}
        >{link.label}</Link>;
    });

    return (
        <header className="bg-emerald-500 bg-opacity-70 border-b border-emerald-700 border-opacity-50 shadow-lg">
            <nav className="grid grid-cols-3">
                <div className="flex items-center justify-start pl-8">
                    Logo
                </div>
                <div className="flex justify-start">
                    {items}
                </div>
            </nav>
        </header>)
}
