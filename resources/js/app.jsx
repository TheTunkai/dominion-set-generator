import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { MantineProvider } from "@mantine/core";
import SimpleHeader from "@/Components/SimpleHeader";
import SimpleFooter from "@/Components/SimpleFooter";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const links = [
            { label: "Home", link: "/" },
            { label: "Database", link: "/database" },
            { label: "Library", link: "/library" },
            { label: "Set Generator", link: "/generator" },
        ];

        root.render(
            <MantineProvider withGlobalStyles>
                <SimpleHeader links={links} />
                <App {...props} />
                <SimpleFooter />
            </MantineProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
