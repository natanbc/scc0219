import React from "react";
import M from '@materializecss/materialize';

import './ProductsFilterSidebar.scss'

function Checkbox(props) {
    return <p>
            <label>
                <input type="checkbox" id={props.id} className="filled-in"/>
                <span>{props.label}</span>
            </label>
        </p>;
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
                { /* TODO Fill this programatically */ }
                <h6 className="grey-text text-darken-1">
                    <strong>Memory Type</strong>
                </h6>
                <button className="btn-flat orange-text text-accent-4">RESET</button>
                <button className="btn-flat orange-text text-accent-4">CLEAR</button>
                <Checkbox label="SDR" id="ddr"/>
                <Checkbox label="DDR" id="ddr"/>
                <Checkbox label="DDR1" id="ddr1"/>
                <Checkbox label="DDR2" id="ddr2"/>
                <Checkbox label="DDR3" id="ddr3"/>
                <Checkbox label="DDR4" id="ddr4"/>
                <br/>
                <h6 className="grey-text text-darken-1">
                    <strong>Memory Type</strong>
                </h6>
                <button className="btn-flat orange-text text-accent-4">RESET</button>
                <button className="btn-flat orange-text text-accent-4">CLEAR</button>
                <Checkbox label="SIMM" id="ddr"/>
                <Checkbox label="DIMM" id="ddr"/>
                <Checkbox label="SODIMM" id="ddr1"/>
                <br/>
            </form>
        </aside>;
}