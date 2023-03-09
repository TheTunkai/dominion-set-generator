export default function InputSelect(props) {
    const optionElements = props.options.map((option, index) => {
        return <option className="font-medium" key={index} value={option}>{option}</option>;
    });

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={props.id}>{props.labelText}</label>
            <select id={props.id} value={props.value} onChange={props.handleChange} className="rounded focus:outline-emerald-500 text-black h-10 border-0" required>
                {optionElements}
            </select>
        </div>
    )
}
