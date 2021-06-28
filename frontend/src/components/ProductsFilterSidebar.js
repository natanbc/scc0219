import React from "react";
import M from 'materialize-css';
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

function FilterGroup({title, values, where}) {
    const checkboxes = [];
    for (const value in values) {
        const id = `checkbox-${where}-${value}`
        checkboxes.push(<Checkbox label={value} id={id} key={id}/>);
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
    const filters = (where) => <>
                <form>
                    <h5>
                        Filters
                        <a className="waves-effect waves-light btn-flat right">
                            <i className="material-icons">close</i>
                        </a>
                    </h5>
                    <FilterGroup title="Memory Type"      where={where} values={MemoryType}/>
                    <FilterGroup title="Memory Format"    where={where} values={MemoryFormat}/>
                    <FilterGroup title="Memory Capacity"  where={where} values={MemoryCapacity}/>
                    <FilterGroup title="Memory Frequency" where={where} values={MemoryFrequency}/>
                </form>
        </>;

    const sidenavRef = React.createRef();

    React.useEffect(() => {
        M.Sidenav.init(sidenavRef.current, {});
    });

    return <>
            <aside className="side-sheet hide-on-small-only">
                {filters("desktop")}
            </aside>
            <ul ref={sidenavRef} id="mobile-filters" className="sidenav hide-on-med-and-up">
                <li>{filters("mobile")}</li>
            </ul>
            <div className="fixed-action-btn hide-on-med-and-up">
                <a className="btn-floating btn-large red sidenav-trigger" data-target="mobile-filters">
                    <i className="large material-icons">filter_list</i>
                </a>
            </div>
        </>;
}
