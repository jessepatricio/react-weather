import React from 'react'
import { render, screen } from '@testing-library/react'
import Chart from '../Chart.jsx'

describe('Chart Component', () => {
  it('renders chart with temperature data', () => {
    const temperatureData = [280, 285, 290, 295, 300]
    render(<Chart data={temperatureData} color="orange" units="C" />)
    
    // Should render the average temperature (converted from Kelvin to Celsius)
    expect(screen.getByText(/17\s*C/)).toBeInTheDocument()
  })

  it('renders chart with pressure data', () => {
    const pressureData = [1013, 1015, 1010, 1008, 1005]
    render(<Chart data={pressureData} color="green" units="hPa" />)
    
    // Should render the average pressure
    expect(screen.getByText('1010 hPa')).toBeInTheDocument()
  })

  it('renders chart with humidity data', () => {
    const humidityData = [60, 65, 70, 75, 80]
    render(<Chart data={humidityData} color="black" units="%" />)
    
    // Should render the average humidity
    expect(screen.getByText('70 %')).toBeInTheDocument()
  })

  it('handles extreme temperature data', () => {
    const extremeTempData = [310, 315, 320, 325, 330] // Very hot
    render(<Chart data={extremeTempData} color="red" units="C" />)
    
    // Should convert from Kelvin to Celsius and round
    expect(screen.getByText(/47\s*C/)).toBeInTheDocument()
  })

  it('handles cold temperature data', () => {
    const coldTempData = [250, 255, 260, 265, 270] // Very cold
    render(<Chart data={coldTempData} color="blue" units="C" />)
    
    // Should convert from Kelvin to Celsius and round
    expect(screen.getByText(/-13\s*C/)).toBeInTheDocument()
  })

  it('handles high pressure data', () => {
    const highPressureData = [1020, 1025, 1030, 1035, 1040]
    render(<Chart data={highPressureData} color="green" units="hPa" />)
    
    expect(screen.getByText('1030 hPa')).toBeInTheDocument()
  })

  it('handles low pressure data', () => {
    const lowPressureData = [850, 845, 840, 835, 830] // High altitude
    render(<Chart data={lowPressureData} color="green" units="hPa" />)
    
    expect(screen.getByText('840 hPa')).toBeInTheDocument()
  })

  it('handles high humidity data', () => {
    const highHumidityData = [85, 90, 95, 100, 100]
    render(<Chart data={highHumidityData} color="black" units="%" />)
    
    expect(screen.getByText('94 %')).toBeInTheDocument()
  })

  it('handles low humidity data', () => {
    const lowHumidityData = [10, 15, 20, 25, 30] // Desert conditions
    render(<Chart data={lowHumidityData} color="black" units="%" />)
    
    expect(screen.getByText('20 %')).toBeInTheDocument()
  })

  it('handles single data point', () => {
    const singleData = [280]
    render(<Chart data={singleData} color="orange" units="C" />)
    
    expect(screen.getByText('7 C')).toBeInTheDocument()
  })

  it('handles empty data array', () => {
    const emptyData = []
    render(<Chart data={emptyData} color="orange" units="C" />)
    
    // Should handle empty data gracefully
    expect(screen.getByText('NaN C')).toBeInTheDocument()
  })

  it('handles different color schemes', () => {
    const testData = [280, 285, 290]
    const colors = ['red', 'blue', 'green', 'orange', 'purple']
    
    colors.forEach(color => {
      const { unmount } = render(<Chart data={testData} color={color} units="C" />)
      expect(screen.getByText(/12\s*C/)).toBeInTheDocument()
      unmount()
    })
  })

  it('handles different unit types', () => {
    const testData = [280, 285, 290]
    const units = ['C', 'F', 'K', 'hPa', '%', 'm/s']
    
    units.forEach(unit => {
      const { unmount } = render(<Chart data={testData} color="orange" units={unit} />)
      if (unit === 'C') {
        expect(screen.getByText(/12\s*C/)).toBeInTheDocument()
      } else {
        expect(screen.getByText(new RegExp(`285\\s*${unit}`))).toBeInTheDocument()
      }
      unmount()
    })
  })

  it('handles decimal temperature conversion', () => {
    const decimalTempData = [280.5, 285.7, 290.3, 295.1, 300.9]
    render(<Chart data={decimalTempData} color="orange" units="C" />)
    
    // Should round the result (using regex to handle text splitting)
    expect(screen.getByText(/7\s*C/)).toBeInTheDocument()
  })

  it('handles negative temperature conversion', () => {
    const negativeTempData = [240, 245, 250, 255, 260] // Below freezing
    render(<Chart data={negativeTempData} color="blue" units="C" />)
    
    // Should convert to negative Celsius (using regex to handle text splitting)
    expect(screen.getByText(/-23\s*C/)).toBeInTheDocument()
  })

  it('handles mixed weather conditions', () => {
    const mixedData = [
      { data: [280, 285, 290], color: 'orange', units: 'C', expected: /12\s*C/ },
      { data: [1013, 1015, 1010], color: 'green', units: 'hPa', expected: /1013\s*hPa/ },
      { data: [60, 65, 70], color: 'black', units: '%', expected: /65\s*%/ }
    ]

    mixedData.forEach(({ data, color, units, expected }) => {
      const { unmount } = render(<Chart data={data} color={color} units={units} />)
      expect(screen.getByText(expected)).toBeInTheDocument()
      unmount()
    })
  })
})
