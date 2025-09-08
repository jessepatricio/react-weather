import React from 'react'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'
import _ from 'lodash'

const average = (data, unit) => {
  if (unit === "C") {
    return _.round(convertKelvinToCelsius(_.sum(data) / data.length))
  } else {
    return _.round(_.sum(data) / data.length)
  }
}

const convertKelvinToCelsius = (kelvin) => {
  return (kelvin - 273.15)
}

const Chart = ({ data, color, units }) => {
  return (
    <div>
      <Sparklines svgHeight={120} svgWidth={180} data={data}>
        <SparklinesLine color={color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{average(data, units)} {units}</div>
    </div>
  )
}

export default Chart
