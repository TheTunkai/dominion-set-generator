import {Head, router} from "@inertiajs/react";
import {useState} from "react";
import {useForm} from "@inertiajs/react";
import {
    MultiSelect,
    TextInput,
    Select,
    Alert,
    LoadingOverlay,
    Tabs,
    FileButton,
    Button,
    Image,
} from "@mantine/core";
import {
    MagnifyingGlassIcon,
    ExclamationCircleIcon,
    PlusIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import CardGrid from "@/Components/CardGrid";
import {messages} from "@/inputMessages";
import Pagination from "@/Components/Pagination";

export default function Database(props) {
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const {
        data: getData,
        setData: setGetData,
        get,
        processing: processingGet,
        errors: getErrors,
        reset: resetGetForm,
        progress: getProgress,
    } = useForm({
        name: "",
        cost: null,
        types: "[]",
        effects: "[]",
    });
    const {
        data: postData,
        setData: setPostData,
        post,
        processing: processingPost,
        errors: postErrors,
        reset: resetPostForm,
        progress: postProgress,
    } = useForm({
        name: "",
        cost: null,
        types: "[]",
        effects: "[]",
        image: "",
    });

    const cardTypes = [
        {label: "Action", value: "action"},
        {label: "Treasure", value: "treasure"},
        {label: "Victory", value: "victory"},
        {label: "Curse", value: "curse"},
        {label: "Attack", value: "attack"},
        {label: "Reaction", value: "reaction"},
    ];

    const cardEffects = [
        {label: "+ Actions", value: "actions"},
        {label: "+ Cards", value: "cards"},
        {label: "+ Buys", value: "buys"},
        {label: "+ Coins", value: "coins"},
        {label: "Trash cards", value: "trash"},
        {label: "Gain card/s", value: "gain"},
        {label: "Victory points", value: "victory"},
        {label: "Junk", value: "junk"},
    ];

    const cardCosts = [
        {value: 0, label: "0"},
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"},
        {value: 6, label: "6"},
        {value: 7, label: "7"},
        {value: 8, label: "8"},
        {value: 9, label: "9"},
        {value: 10, label: "10"},
        {value: 11, label: "11"},
        {value: 12, label: "12"},
    ];

    const tabClasses =
        "transition duration-75 text-lg bg-emerald-400 bg-opacity-50 hover:bg-opacity-80 hover:bg-emerald-400 aria-selected:bg-opacity-90 aria-selected:text-white aria-selected:font-semibold text-emerald-50";

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

    const selectClasses = {
        root: "flex flex-col gap-2",
        input: "rounded h-10 focus:ring-0 focus:shadow-none focus:outline-emerald-500 focus:border-0",
        label: "text-emerald-50 text-md",
        item: "hover:bg-emerald-100",
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(postData);
        isPostInputMissing()
            ? setShowAlert(true)
            : post(route("add-card"), {
                preserveScroll: true,
                onSuccess: () => handlePostSuccess(),
            });
    }

    function handleSearch(event) {
        event.preventDefault();
        console.log(getData);
        get(route("search-cards"), {
            preserveScroll: true,
        });
    }

    function handleDelete(event, id) {
        event.preventDefault();
        console.log(id);
        router.delete(route("delete-card", {id: id}));
    }

    function isPostInputMissing() {
        return (
            (postData.name === "") |
            (postData.types === "[]") |
            (postData.effects === "[]") |
            (postData.image === "")
        );
    }

    function handlePostSuccess() {
        resetPostForm();
        setShowSuccess(true);
    }

    function handleImageChange(fileObject) {
        if (fileObject !== null) {
            encodeImageAsBase64(fileObject, (result) => {
                setPostData("image", result);
            });
        }
    }

    function encodeImageAsBase64(file, callback) {
        const reader = new FileReader();
        reader.onloadend = () => {
            callback(reader.result);
        };
        reader.readAsDataURL(file);
    }

    return (
        <>
            <Head>
                <title>Database</title>
            </Head>
            <main className="min-h-screen flex flex-col items-center p-24">
                <Tabs defaultValue="search" color="teal">
                    <Tabs.List
                        className="border-b-emerald-500 border-opacity-50"
                        position="center"
                    >
                        <Tabs.Tab
                            className={tabClasses}
                            value="search"
                            icon={<MagnifyingGlassIcon className="h-6"/>}
                        >
                            Card Search
                        </Tabs.Tab>
                        <Tabs.Tab
                            className={tabClasses}
                            value="add-card"
                            icon={<PlusIcon className="h-6"/>}
                        >
                            Add Cards
                        </Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="search" pt="xl">
                        <div className="font-medium text-md mb-16">
                            <form
                                className="flex flex-col gap-8 items-center"
                                onSubmit={handleSearch}
                            >
                                <div className="grid grid-cols-4 gap-8">
                                    <TextInput
                                        id="name"
                                        label="Card name"
                                        placeholder="Cards name"
                                        value={getData.name}
                                        onChange={(event) =>
                                            setGetData(
                                                "name",
                                                event.target.value
                                            )
                                        }
                                        classNames={textInputClasses}
                                    />
                                    <Select
                                        id="cost"
                                        label="Card cost"
                                        placeholder="Select cards cost"
                                        data={cardCosts}
                                        value={getData.cost}
                                        onChange={(event) =>
                                            setGetData("cost", event)
                                        }
                                        classNames={selectClasses}
                                    />
                                    <MultiSelect
                                        id="types"
                                        data={cardTypes}
                                        value={JSON.parse(getData.types)}
                                        onChange={(event) =>
                                            setGetData(
                                                "types",
                                                JSON.stringify(event)
                                            )
                                        }
                                        label="Card types"
                                        placeholder="Select card types"
                                        variant="unstyled"
                                        classNames={multiSelectClasses}
                                    />
                                    <MultiSelect
                                        id="effects"
                                        label="Card effects"
                                        placeholder="Select card effects"
                                        data={cardEffects}
                                        value={JSON.parse(getData.effects)}
                                        onChange={(event) =>
                                            setGetData(
                                                "effects",
                                                JSON.stringify(event)
                                            )
                                        }
                                        variant="unstyled"
                                        classNames={multiSelectClasses}
                                    />
                                </div>
                                <button
                                    className="rounded-lg text-lg px-6 py-2 font-semibold uppercase bg-opacity-70 bg-emerald-500 hover:bg-opacity-100 transition duration-75">
                                    Search
                                </button>
                            </form>
                            {Object.keys(props.errors).length !== 0 && (
                                <Alert
                                    className="mt-12 font-normal"
                                    icon={<ExclamationCircleIcon/>}
                                    title="Error in input fields"
                                    color="red"
                                >
                                    {JSON.stringify(props.errors)}
                                </Alert>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-xl text-center mb-8">
                                Search Results
                            </h3>
                            <CardGrid
                                cards={props.cards.data}
                                handleDelete={handleDelete}
                            />
                            <Pagination pageData={props.cards}/>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="add-card" pt="xl">
                        <div className="font-medium text-md">
                            <LoadingOverlay
                                visible={processingPost}
                                overlayBlur={2}
                                loaderProps={{color: "green"}}
                            />
                            <form
                                className="flex flex-col gap-8 items-center"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid grid-cols-4 gap-8">
                                    <TextInput
                                        required
                                        id="name"
                                        label="Card name"
                                        placeholder="Cards name"
                                        value={postData.name}
                                        onChange={(event) =>
                                            setPostData(
                                                "name",
                                                event.target.value
                                            )
                                        }
                                        classNames={textInputClasses}
                                    />
                                    <Select
                                        required
                                        id="cost"
                                        label="Card cost"
                                        placeholder="Select cards cost"
                                        data={cardCosts}
                                        value={postData.cost}
                                        onChange={(event) =>
                                            setPostData("cost", event)
                                        }
                                        classNames={selectClasses}
                                    />
                                    <MultiSelect
                                        required
                                        id="types"
                                        data={cardTypes}
                                        value={JSON.parse(postData.types)}
                                        onChange={(event) =>
                                            setPostData(
                                                "types",
                                                JSON.stringify(event)
                                            )
                                        }
                                        label="Card types"
                                        placeholder="Select card types"
                                        variant="unstyled"
                                        classNames={multiSelectClasses}
                                    />
                                    <MultiSelect
                                        required
                                        id="effects"
                                        label="Card effects"
                                        placeholder="Select card effects"
                                        data={cardEffects}
                                        value={JSON.parse(postData.effects)}
                                        onChange={(event) =>
                                            setPostData(
                                                "effects",
                                                JSON.stringify(event)
                                            )
                                        }
                                        variant="unstyled"
                                        classNames={multiSelectClasses}
                                    />
                                </div>
                                <div className="flex-col flex items-center gap-8">
                                    <FileButton
                                        accept="image/png,image/jpeg"
                                        onChange={handleImageChange}
                                    >
                                        {(props) => (
                                            <Button
                                                className="rounded-lg text-md px-6 py- font-medium bg-opacity-70 bg-emerald-500 hover:bg-opacity-100 hover:bg-emerald-500 transition duration-75"
                                                {...props}
                                            >
                                                Upload image
                                            </Button>
                                        )}
                                    </FileButton>
                                    {postData.image !== "no image" && (
                                        <Image
                                            maw={160}
                                            radius="md"
                                            src={postData.image}
                                        />
                                    )}
                                </div>
                                <button
                                    className="rounded-lg text-lg px-6 py-2 font-semibold uppercase bg-opacity-70 bg-emerald-500 hover:bg-opacity-100 transition duration-75">
                                    Submit
                                </button>
                            </form>
                            {showAlert && (
                                <Alert
                                    className="mt-16 font-normal"
                                    icon={<ExclamationCircleIcon/>}
                                    title="Input missing"
                                    color="red"
                                    withCloseButton
                                    closeButtonLabel="Close alert"
                                    onClose={() => setShowAlert(false)}
                                >
                                    {messages.cardPostError}
                                </Alert>
                            )}
                            {showSuccess && (
                                <Alert
                                    className="mt-16 font-normal"
                                    title="Success"
                                    icon={<CheckCircleIcon/>}
                                    color="teal"
                                    withCloseButton
                                    closeButtonLabel="Close alert"
                                    onClose={() => setShowSuccess(false)}
                                >
                                    {messages.cardPostSuccess}
                                </Alert>
                            )}
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </main>
        </>
    );
}
