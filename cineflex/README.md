# CineFlex

CineFlex is a React application that showcases popular anime and movie items with a smooth horizontal scrolling interface. The application is designed to provide an engaging user experience by allowing users to easily browse through popular content.

## Features

- **Popular Anime Section**: Displays a list of popular anime items with horizontal scrolling functionality.
- **Popular Movies Section**: Displays a list of popular movie items with horizontal scrolling functionality.
- **Reusable Component**: A reusable component that consolidates the functionality of both the anime and movie sections, promoting code reusability and maintainability.

## Installation

To get started with the CineFlex project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd cineflex
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the application, use the following command:
```
npm start
```

This will start the development server and open the application in your default web browser.

## Project Structure

```
cineflex
├── src
│   ├── components
│   │   ├── home
│   │   │   ├── PopularAnimeSection.tsx
│   │   │   ├── PopularSection.tsx
│   │   │   └── ReusablePopularSection.tsx
│   │   └── data
│   │       ├── AnimeItem.ts
│   │       └── Movie.ts
│   └── App.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.