import {Container, Group} from "@mantine/core";

export default function SimpleFooter() {
    const links = [{label: "GitHub", link: "https://github.com/TheTunkai"}];
    const items = links.map(link => {
        return <a key={link.link} className="hover:text-white hover:underline transition duration-75" href={link.link}>{link.label}</a>;
    })

    return (
        <footer className="text-lg flex flex-col bg-emerald-500 bg-opacity-70 shadow-lg">
            <div className="flex justify-center py-6">{items}</div>
            <div className="flex justify-center border-t-emerald-400 border-opacity-40 border-t pt-4 pb-2 mx-24">© 2023 TheTunkai</div>
        </footer>
    );
}
