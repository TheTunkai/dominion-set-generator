export default function InputText(props) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id}>{props.labelText}</label>
            <input id={props.id} value={props.value} onChange={props.handleChange}
                   className="h-10 text-black font-medium px-2 py-1 rounded focus:outline-emerald-500" required/>
        </div>
    )
}
