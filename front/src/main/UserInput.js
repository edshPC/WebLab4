import {useState} from "react";

function UserInput(props) {
    const fetcher = props.fetcher;

    return (
        <table id="input-table">
            <tbody>
            <tr>
                <td colSpan="3" className="input-cell-l">Введи значения:</td>
            </tr>
            <tr>
                <td className="input-cell-l">X:</td>
                <td id="x-cell">
                    <ButtonPanel id="x-table" from={-4} to={4} onChange={fetcher.handleX}/>
                </td>
            </tr>
            <tr>
                <td className="input-cell-l">Y:</td>
                <td id="y-cell">
                    <input className="input-select rounded box" id="y-select" name="y-select" placeholder="Enter value"
                           required type="text" onChange={fetcher.handleY}/>
                </td>
            </tr>
            <tr>
                <td className="input-cell-l">R:</td>
                <td id="r-cell">
                    <ButtonPanel id="r-table" from={-4} to={4} onChange={fetcher.handleR}/>
                </td>
            </tr>
            <tr>
                <td colSpan="3">
                    <button id="submit-button" className="rounded" onClick={fetcher.handleSubmit}>Вычислить</button>
                </td>
            </tr>
            <tr>
                <td colSpan="3">
                    <button id="clear-button" className="rounded" onClick={fetcher.handleClear}>Очистить</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

function ButtonPanel(props) {

    const [selectedKey, setSelectedKey] = useState();
    const onChange = props.onChange;

    const buttons = [];
    for (let i = props.from; i <= props.to; i++) {
        buttons.push(
            <td className="button" key={i}>
                <button className={`small-button rounded ${selectedKey === i ? "selected" : ""}`}
                        key={i} value={i} onClick={() => {
                    setSelectedKey(i);
                    onChange({target: {value: i}});
                }}>
                    {i}
                </button>
            </td>
        );
    }

    const rows = [];
    for (let i = 0; i < buttons.length; i += 3) {
        rows.push(
            <tr key={i}>
                {buttons.slice(i, Math.min(i + 3, buttons.length))}
            </tr>
        );
    }

    return (
        <table id={props.id}>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default UserInput;