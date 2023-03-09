import {ArrowRightIcon} from "@heroicons/react/20/solid";

export default function InfoCard(props) {
    return (
        <div className="grid grid-rows-4 border-emerald-700 hover:border-emerald-600 border-2 transition duration-75 p-4 rounded-lg bg-emerald-500 bg-opacity-70">
            <div className="row-span-3">
                <h3 className="font-semibold text-3xl mb-4">
                    {props.title}
                </h3>
                <p className="text-lg">
                    {props.text}
                </p>
            </div>
            <a href={props.link} className="flex justify-end items-center opacity-50 hover:opacity-100 transition duration-75">
                {`To ${props.title}`}<ArrowRightIcon className="w-6 ml-3"/>
            </a>
        </div>
    )
}
