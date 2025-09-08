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

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests
- `npm run test:ui` - Run tests with UI

## Project Structure

```
src/
├── components/          # React components
│   ├── App.jsx         # Main app component
│   ├── Chart.jsx       # Weather data charts
│   └── GoogleMap.jsx   # Google Maps integration
├── containers/         # Redux-connected components
│   ├── SearchBar.jsx   # City search functionality
│   └── WeatherList.jsx # Weather data display
├── actions/            # Redux actions
│   └── index.js        # Weather API actions
├── reducers/           # Redux reducers
│   ├── index.js        # Root reducer
│   └── reducer_weather.js # Weather state management
└── main.jsx           # Application entry point
```

## API

This app uses the OpenWeatherMap API to fetch weather data. The API key is included in the code for demonstration purposes.

## Migration from Webpack

This project has been migrated from Webpack to Vite for improved performance and developer experience:

- ✅ Modern build tooling with Vite
- ✅ Updated to React 18 with hooks
- ✅ Modern ES modules
- ✅ Improved development server
- ✅ Better build optimization
- ✅ Updated dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.