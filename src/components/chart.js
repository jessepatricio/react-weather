import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

function average(data, unit){
    if (unit === "C") {
        return _.round(convertKelvinToCelsius(_.sum(data)/data.length));
    } else {
        return _.round(_.sum(data)/data.length);
    }
}

function convertKelvinToCelsius(kelvin){
    return (kelvin-273.15);
}

export default (props) => {
    return (
    <div>
        <Sparklines svgHeight={120} svgWidth={180} data={props.data}>
            <SparklinesLine color={props.color} />
            <SparklinesReferenceLine type="avg" />
        </Sparklines>
        <div>{average(props.data, props.units)} {props.units}</div>
    </div>
    );
}