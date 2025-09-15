# React Weather App with Vite

A modern React weather application built with Vite, featuring real-time weather data visualization and interactive maps.

## Demo

[![Watch the video](https://img.youtube.com/vi/sLqvHZUPFtI/maxresdefault.jpg)](https://www.youtube.com/watch?v=sLqvHZUPFtI)

## Features

- 🌤️ 5-day weather forecast for US cities
- 📊 Interactive charts showing temperature, pressure, and humidity trends
- 🗺️ Google Maps integration showing city locations (with graceful fallback)
- ⚡ Fast development with Vite
- 🎨 Modern UI with Bootstrap 5
- 📱 Responsive design
- 🧪 Comprehensive test suite with 85%+ coverage
- 🎯 Multiple city support with various weather conditions
- 📈 Real-time weather data visualization

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Redux** - State management
- **Axios** - HTTP client
- **React Sparklines** - Data visualization
- **Google Maps API** - Interactive maps
- **Bootstrap 5** - UI framework
- **Vitest** - Fast unit testing framework
- **Testing Library** - React component testing utilities

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Google Maps API key (optional, for map functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-weather-vite
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Maps API (optional):
   - Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Replace `YOUR_API_KEY` in `index.html` and `src/components/GoogleMap.jsx` with your actual API key

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run tests in watch mode (auto-rerun on changes)
- `npm run test:run` - Run tests once and exit
- `npm run test:ui` - Open interactive test UI in browser
- `npm run test:coverage` - Run tests with coverage report

## Project Structure

```
src/
├── components/          # React components
│   ├── __tests__/      # Component tests
│   │   ├── App.test.jsx
│   │   └── Chart.test.jsx
│   ├── App.jsx         # Main app component
│   ├── Chart.jsx       # Weather data charts
│   └── GoogleMap.jsx   # Google Maps integration
├── containers/         # Redux-connected components
│   ├── __tests__/      # Container tests
│   │   ├── SearchBar.test.jsx
│   │   └── WeatherList.test.jsx
│   ├── SearchBar.jsx   # City search functionality
│   └── WeatherList.jsx # Weather data display
├── actions/            # Redux actions
│   └── index.js        # Weather API actions
├── reducers/           # Redux reducers
│   ├── __tests__/      # Reducer tests
│   │   └── reducer_weather.test.js
│   ├── index.js        # Root reducer
│   └── reducer_weather.js # Weather state management
├── test/               # Test configuration
│   └── setup.js        # Test setup file
└── main.jsx           # Application entry point
```

## Testing

This project uses **Vitest** for fast unit testing with modern tooling and excellent developer experience.

### Test Framework Features

- ⚡ **Fast execution** - Vitest runs tests in parallel for speed
- 🔄 **Hot reload** - Tests automatically rerun when files change
- 🎨 **Beautiful UI** - Interactive test interface in browser
- 📊 **Coverage reports** - Detailed code coverage analysis
- 🧪 **Modern testing** - Built-in support for ES modules and TypeScript

### Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm run test:run

# Open interactive test UI in browser
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Coverage

Comprehensive test coverage includes:

- ✅ **App Component** - Main application rendering and structure
- ✅ **SearchBar Component** - Search functionality, form handling, and input validation
- ✅ **WeatherList Component** - Multiple cities display and weather data rendering
- ✅ **Chart Component** - Weather data visualization with various conditions
- ✅ **Weather Reducer** - Redux state management with multiple cities
- ✅ **Component Integration** - Redux store integration and data flow

**Current Coverage: 85.18%** with 100% coverage on critical Redux logic and core components.

#### Test Statistics:
- **45 tests** across 5 test files
- **Statements**: 85.18% coverage
- **Branches**: 88.46% coverage  
- **Functions**: 92.85% coverage
- **Lines**: 85.18% coverage

### Test Scenarios Covered

The test suite includes comprehensive scenarios for:

#### 🌡️ **Weather Data Testing**
- **Temperature**: Hot (310K+), cold (250K-), normal ranges with Kelvin to Celsius conversion
- **Humidity**: High (85%+), low (20%-), normal ranges
- **Pressure**: High altitude (850hPa), sea level (1013hPa+)

#### 🏙️ **City Support**
- **Major Cities**: New York, Los Angeles, Chicago, Phoenix, Miami, Denver, Seattle, Portland, San Francisco, Boston, Atlanta
- **Coordinate Formats**: Various lat/lon formats and precision
- **Weather Patterns**: Coastal cities (high humidity), mountain cities (low pressure), desert cities (extreme temperatures)

#### 📊 **Data Visualization**
- **Chart Components**: Single data points, multiple data points, empty arrays
- **Color Schemes**: Different colors for temperature, pressure, humidity
- **Unit Types**: Celsius, Fahrenheit, Kelvin, hPa, percentage

#### 🔍 **Search Functionality**
- **Input Formats**: Lowercase, uppercase, with spaces, hyphens, periods
- **Form Handling**: Enter key submission, button clicks, input validation
- **State Management**: Input clearing, rapid successive searches

### Writing Tests

Tests are located in `__tests__` directories next to the components they test:

```javascript
// Example test structure
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Component from '../Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### Test Configuration

- **Test runner**: Vitest
- **Testing utilities**: React Testing Library
- **Environment**: jsdom (browser-like environment)
- **Setup file**: `src/test/setup.js`

## API

This app uses the OpenWeatherMap API to fetch weather data. The API key is included in the code for demonstration purposes.

## Migration from Webpack

This project has been completely migrated from Webpack to Vite for improved performance and developer experience:

- ✅ **Modern build tooling** with Vite
- ✅ **Updated to React 18** with hooks
- ✅ **Modern ES modules** support
- ✅ **Improved development server** with hot reload
- ✅ **Better build optimization** and faster builds
- ✅ **Updated dependencies** to latest versions
- ✅ **Modern testing setup** with Vitest
- ✅ **Enhanced developer experience** with testing UI
- ✅ **Comprehensive test coverage** with 45 tests across multiple scenarios
- ✅ **Multiple city support** with various weather conditions
- ✅ **Graceful error handling** for Google Maps API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. **Add tests** for new functionality
5. **Run tests** to ensure everything passes: `npm test`
6. **Check coverage** to maintain quality: `npm run test:coverage`
7. **Ensure 85%+ coverage** is maintained
8. Submit a pull request

### Development Workflow

```bash
# Start development
npm run dev

# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm run test:run

# Open interactive test UI in browser
npm run test:ui

# Check test coverage
npm run test:coverage

# Build for production
npm run build
```

### Testing Guidelines

- **Write tests for all new components** and functionality
- **Maintain 85%+ test coverage** across the codebase
- **Test edge cases** including extreme weather conditions
- **Use descriptive test names** that explain the scenario
- **Test both happy path and error conditions**
- **Include tests for multiple cities** and various weather patterns

## License

This project is licensed under the ISC License.