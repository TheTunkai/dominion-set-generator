import SimpleFooter from "@/Components/SimpleFooter";
import SimpleHeader from "@/Components/SimpleHeader";
import { Head } from "@inertiajs/react";

export default function MainLayout({ children, title }) {
    const links = [
        { label: "Home", link: "/" },
        { label: "Database", link: "/database" },
        { label: "Library", link: "/library" },
        { label: "Set Generator", link: "/generator" },
    ];

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <SimpleHeader links={links} currentPageTitle={title} />
            {children}
            <SimpleFooter />
        </>
    );
}
