import CardGrid from "@/Components/CardGrid";
import CardSetDisplay from "@/Components/CardSetDisplay";
import MainLayout from "@/layouts/MainLayout";
import { Head, useForm } from "@inertiajs/react";
import { MultiSelect, TextInput, LoadingOverlay } from "@mantine/core";

export default function SetGenerator(props) {
    const {
        data: postData,
        setData: setPostData,
        post,
        processing: processingPost,
        errors: postErrors,
        reset: resetPostForm,
        progress: postProgress,
    } = useForm({
        title: "",
        author: "",
        cards: "[]",
    });
    const multiSelectClasses = {
        item: "hover:bg-emerald-100",
        root: "flex flex-col gap-2 ",
        label: "text-emerald-50 text-md",
        defaultValue: "bg-emerald-400 mx-2",
        defaultValueLabel: "text-black",
        defaultValueRemove:
            "text-black hover:bg-emerald-500 hover:bg-opacity-40",
        values: "bg-white max-w-[16rem] pl-2",
        wrapper: "rounded",
        searchInput: "focus:shadow-none focus:ring-0",
    };
    const textInputClasses = {
        root: "flex flex-col gap-2",
        input: "rounded h-10 focus:ring-0 focus:shadow-none focus:outline-emerald-500 focus:border-0",
        label: "text-emerald-50 text-md",
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(postData);
        post(route("generate-set"), {
            preserveScroll: true,
            onSuccess: () => handleSuccess(),
        });
    }

    function handleSuccess() {
        console.log(props.generatedSet);
    }

    function getAllCardsNames() {
        return props.allCards?.map((card) => card.name);
    }

    return (
        <>
            <Head>
                <title>Set Generator</title>
            </Head>
            <main className="min-h-screen flex flex-col items-center p-24">
                <LoadingOverlay
                    visible={processingPost}
                    overlayBlur={2}
                    loaderProps={{ color: "green" }}
                />
                <div className="font-medium text-md mb-16">
                    <h3 className="font-semibold text-2xl text-center mb-12">
                        Generate a Set
                    </h3>
                    <form
                        className="flex flex-col gap-8 items-center"
                        onSubmit={(event) => handleSubmit(event)}
                    >
                        <div className="grid grid-cols-3 gap-8">
                            <TextInput
                                id="title"
                                label="Cardset title"
                                placeholder="Cardset title"
                                classNames={textInputClasses}
                                value={postData.title}
                                onChange={(event) =>
                                    setPostData("title", event.target.value)
                                }
                            />
                            <TextInput
                                id="author"
                                label="Author name"
                                placeholder="Author name"
                                classNames={textInputClasses}
                                value={postData.author}
                                onChange={(event) =>
                                    setPostData("author", event.target.value)
                                }
                            />
                            <MultiSelect
                                id="cards"
                                label="Cards to use"
                                placeholder="Select cards"
                                data={getAllCardsNames()}
                                onChange={(event) =>
                                    setPostData("cards", JSON.stringify(event))
                                }
                                value={JSON.parse(postData.cards)}
                                variant="unstyled"
                                classNames={multiSelectClasses}
                            />
                        </div>
                        <button className="rounded-lg text-lg px-6 py-2 font-semibold uppercase bg-opacity-70 bg-emerald-500 hover:bg-opacity-100 transition duration-75">
                            Generate
                        </button>
                        {props.cardSet && (
                            <div className="mt-12">
                                <CardGrid cards={props.cardSet} />
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </>
    );
}

SetGenerator.layout = (page) => (
    <MainLayout children={page} title="Set Generator" />
);
