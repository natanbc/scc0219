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
    const filters = <>
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
        </>;

    const fabRef = React.createRef();
    const sidenavRef = React.createRef();

    React.useEffect(() => {
        M.FloatingActionButton.init(fabRef.current, {});
        M.Sidenav.init(sidenavRef.current, {});
    });

    return <>
            <aside className="side-sheet hide-on-small-only">
                {filters}
            </aside>
            <ul ref={sidenavRef} id="mobile-filters" className="sidenav hide-on-med-and-up">
                <li>{filters}</li>
            </ul>
            <div className="fixed-action-btn hide-on-med-and-up">
                <a className="btn-floating btn-large red sidenav-trigger" data-target="mobile-filters">
                    <i className="large material-icons">filter_list</i>
                </a>
            </div>
        </>;
}
