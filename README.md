# React Weather App with Vite

A modern React weather application built with Vite, featuring real-time weather data visualization and interactive maps.

## Features

- 🌤️ 5-day weather forecast for US cities
- 📊 Interactive charts showing temperature, pressure, and humidity trends
- 🗺️ Google Maps integration showing city locations
- ⚡ Fast development with Vite
- 🎨 Modern UI with Bootstrap 5
- 📱 Responsive design

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
│   │   └── App.test.jsx
│   ├── App.jsx         # Main app component
│   ├── Chart.jsx       # Weather data charts
│   └── GoogleMap.jsx   # Google Maps integration
├── containers/         # Redux-connected components
│   ├── __tests__/      # Container tests
│   │   └── SearchBar.test.jsx
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

Current test coverage includes:

- ✅ **App Component** - Main application rendering
- ✅ **SearchBar Component** - Search functionality and form handling
- ✅ **Weather Reducer** - Redux state management
- ✅ **Component Integration** - Redux store integration

**Current Coverage: 54.73%** with 100% coverage on critical Redux logic.

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

This project has been migrated from Webpack to Vite for improved performance and developer experience:

- ✅ **Modern build tooling** with Vite
- ✅ **Updated to React 18** with hooks
- ✅ **Modern ES modules** support
- ✅ **Improved development server** with hot reload
- ✅ **Better build optimization** and faster builds
- ✅ **Updated dependencies** to latest versions
- ✅ **Modern testing setup** with Vitest
- ✅ **Enhanced developer experience** with testing UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. **Add tests** for new functionality
5. **Run tests** to ensure everything passes: `npm test`
6. **Check coverage** to maintain quality: `npm run test:coverage`
7. Submit a pull request

### Development Workflow

```bash
# Start development
npm run dev

# Run tests in watch mode
npm test

# Check test coverage
npm run test:coverage

# Build for production
npm run build
```

## License

This project is licensed under the ISC License.