# Carbon Footprint Calculator 🌍

A modern, responsive web application built with React and Vite that allows users to calculate, track, and understand their carbon footprint. Visualize your environmental impact through interactive charts and discover your eco-equivalents.

## ✨ Features

- **Calculate Emissions**: Input daily activities across travel, food, and energy to calculate your carbon footprint in kg CO₂.
- **Interactive Visualizations**: View your emissions breakdown with beautiful, responsive charts powered by Recharts.
- **Eco Equivalents**: Understand your impact in relatable terms (e.g., miles driven, flights taken, trees needed to absorb the CO₂).
- **Social Sharing**: Share your results on Twitter, LinkedIn, or copy them to your clipboard.
- **Historical Tracking**: (Future) View your past emissions to track your progress over time.
- **Goal Setting**: (Future) Set personal goals to reduce your carbon footprint.
- **Gamification**: Earn badges for eco-friendly achievements and milestones.
- **Dark Mode**: A sleek, modern UI with a toggleable dark mode that also respects your system's theme preference.
- **Responsive Design**: A mobile-first design that looks great on all devices, built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: Redux Toolkit

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18+ recommended)
- A package manager like npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/carbon-footprint-calculator.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd carbon-footprint-calculator
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

### Running the Development Server

To start the Vite development server, run:

```sh
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port specified in your console).

## 📂 Project Structure

The project is organized with a clear and scalable structure:

- `src/assets/`: Static assets like images and icons.
- `src/components/`: Reusable React components (e.g., `Results.jsx`, `ShareButtons.jsx`).
- `src/data/`: Static data files used across the application (e.g., `equivalents.js`, `badges.js`).
- `src/hooks/`: Custom React hooks for managing state and logic (e.g., `useEmissions.js`).
- `src/pages/`: Page-level components for routing (e.g., `Dashboard.jsx`, `History.jsx`).
- `src/utils/`: Utility and helper functions (e.g., `badges.js`).
- `src/main.jsx`: The main entry point of the application.
- `src/App.jsx`: The root component containing routing, layout, and global state.
