import React from "react";
import { MemoryCapacity, MemoryFormat, MemoryFrequency, MemoryType } from '../model/MemoryInfo';

import './ProductsFilterSidebar.scss'

function Checkbox(props) {
    return <p>
            <label>
                <input type="checkbox" id={props.id} className="filled-in"/>
                <span>{props.label}</span>
            </label>
        </p>;
}

function FilterGroup({title, values}) {
    const checkboxes = [];
    for (const value in values) {
        checkboxes.push(<Checkbox label={value} id={value}/>);
    }

    return <>
            <h6 className="grey-text text-darken-1">
                <strong>{title}</strong>
            </h6>
            <button className="btn-flat orange-text text-accent-4">RESET</button>
            <button className="btn-flat orange-text text-accent-4">CLEAR</button>
            <div className="filter-group">
            {checkboxes}
            </div>
            <br/>
        </>;
}


export function ProductsFilterSidebar() {
    return <aside className="side-sheet">
            <form>
                <h5>
                    Filters
                    <a className="waves-effect waves-light btn-flat right">
                        <i className="material-icons">close</i>
                    </a>
                </h5>
                <FilterGroup title="Memory Type" values={MemoryType}/>
                <FilterGroup title="Memory Format" values={MemoryFormat}/>
                <FilterGroup title="Memory Capacity" values={MemoryCapacity}/>
                <FilterGroup title="Memory Frequency" values={MemoryFrequency}/>
            </form>
        </aside>;
}
