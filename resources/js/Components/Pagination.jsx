import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from "@heroicons/react/20/solid";

export default function Pagination(props) {
    return (
        <div className="grid grid-cols-3 mt-8">
            {props.pageData.prev_page_url && (
                <a
                    className="col-start-1 text-lg hover:font-medium flex items-center gap-3 bg-emerald-500 bg-opacity-70 hover:bg-opacity-100 m-auto rounded-lg px-3 py-1 hover:underline"
                    href={props.pageData.prev_page_url}
                >
                    <ChevronDoubleLeftIcon className="h-5"/>
                    Prev
                </a>
            )}
            {props.pageData.next_page_url && (
                <a
                    className="col-start-2 text-lg hover:font-medium flex items-center gap-3 bg-emerald-500 bg-opacity-70 hover:bg-opacity-100 m-auto rounded-lg px-3 py-1 hover:underline"
                    href={props.pageData.next_page_url}
                >
                    Next
                    <ChevronDoubleRightIcon className="h-5"/>
                </a>
            )}
        </div>
    )
}
