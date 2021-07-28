import React from "react";
import M from 'materialize-css';
import { MemoryCapacity, MemoryFormat, MemoryFrequency, MemoryType } from '../model/MemoryInfo';

import './ProductsFilterSidebar.scss'

function Checkbox(props) {
    return <p>
            <label>
                <input type="checkbox" id={props.id} onChange={props.onChange} className="filled-in"/>
                <span>{props.label}</span>
            </label>
        </p>;
}

function filterList(values, key, products) {
    const res = {};
    for(const k of Object.getOwnPropertyNames(values)) {
        if(products.find(p => p[key] === k)) {
            res[k] = values[k];
        }
    }
    return res;
}

function FilterGroup({title, values, where, filterKey, onChange, products, filter}) {
    const filteredValues = filterList(values, filterKey, filter.filterValues(products));
    const checkboxes = [];
    for (const value of Object.getOwnPropertyNames(values)) {
        if(!filteredValues[value] && !filter.isEnabled(filterKey, value)) continue;
        const id = `checkbox-${where}-${value}`
        checkboxes.push(<Checkbox label={value} id={id} key={id} onChange={(event) => {
            onChange(filterKey, value, event.target.checked);
        }}/>);
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

export function ProductsFilterSidebar({products, onChange, filter}) {
    const filters = (where) => <>
                <form>
                    <h5>
                        Filters
                    </h5>
                    <FilterGroup title="Memory Type"
                                 where={where}
                                 onChange={onChange}
                                 filterKey="memoryType"
                                 values={MemoryType}
                                 products={products}
                                 filter={filter}
                    />
                    <FilterGroup title="Memory Format"
                                 where={where}
                                 onChange={onChange}
                                 filterKey="memoryFormat"
                                 values={MemoryFormat}
                                 products={products}
                                 filter={filter}
                    />
                    <FilterGroup title="Memory Capacity"
                                 where={where}
                                 onChange={onChange}
                                 filterKey="memoryCapacity"
                                 values={MemoryCapacity}
                                 products={products}
                                 filter={filter}
                    />
                    <FilterGroup title="Memory Frequency"
                                 where={where}
                                 onChange={onChange}
                                 filterKey="memoryFrequency"
                                 values={MemoryFrequency}
                                 products={products}
                                 filter={filter}
                    />
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
                <a href="#" className="btn-floating btn-large red sidenav-trigger" data-target="mobile-filters">
                    <i className="large material-icons">filter_list</i>
                </a>
            </div>
        </>;
}
