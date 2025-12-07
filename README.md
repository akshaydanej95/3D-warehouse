# Warehouse3D

A 3D warehouse visualization application built with Angular and Three.js, featuring an animated robot navigating through a multi-level warehouse environment.

## Overview

This project demonstrates a proof-of-concept for visualizing warehouse operations in 3D space, with an autonomous robot moving through different levels and aisles of a warehouse facility.

## Features

### 🏢 3D Warehouse Environment
- **Multi-level Structure**: 5-floor warehouse with realistic spacing
- **Rack Systems**: 40 storage racks per level (8 rows × 5 columns)
- **Grid Layout**: Visual grid system for spatial reference
- **Wireframe Design**: Clean blue wireframe representation of storage racks

### 🤖 Animated Robot
- **Autonomous Navigation**: Robot follows predefined waypoints
- **Multi-level Movement**: Travels horizontally across aisles and vertically between floors
- **Continuous Loop**: Returns to starting position for endless operation
- **Smooth Animation**: Consistent speed with smooth transitions between waypoints

### 🎮 Interactive Controls
- **Orbit Camera**: 360° rotation around the warehouse
- **Zoom**: Mouse wheel zoom in/out functionality
- **Pan**: Click and drag to explore different angles
- **Damping**: Smooth camera movement with momentum

### 📱 Responsive Design
- **Auto-resize**: Adapts to window size changes
- **Aspect Ratio**: Maintains proper camera perspective
- **Performance**: Optimized rendering with WebGL

## Technology Stack

- **Frontend Framework**: Angular 20.1.0
- **3D Graphics**: Three.js
- **Language**: TypeScript
- **Styling**: SCSS
- **Build Tool**: Angular CLI
- **Camera Controls**: OrbitControls from Three.js

## Implementation Details

### Architecture
The application is structured as a single Angular component that manages the Three.js scene:

```typescript
export class App implements OnInit, OnDestroy {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private robot: THREE.Mesh;
}
```

### Key Components

1. **Scene Initialization** (`initScene()`)
   - Sets up Three.js scene with proper lighting
   - Configures perspective camera and WebGL renderer
   - Initializes OrbitControls for user interaction

2. **Warehouse Generation** (`createWarehouse()`)
   - Procedurally generates 5 levels of storage racks
   - Each rack represented as wireframe geometry
   - Positions racks in organized grid pattern

3. **Robot Navigation** (`createWaypoints()` & `moveRobot()`)
   - Generates path covering all warehouse levels
   - Implements smooth movement between waypoints
   - Handles level transitions and looping

4. **Animation Loop** (`animate()`)
   - Runs at 60 FPS using `requestAnimationFrame`
   - Updates robot position and camera controls
   - Renders scene continuously

### Performance Optimizations
- **Efficient Geometry**: Uses wireframe rendering for reduced polygon count
- **Proper Cleanup**: Implements `ngOnDestroy` for memory management
- **Smooth Controls**: Damped camera movement for better user experience

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd warehouse3D
```

2. Install dependencies:
```bash
npm install
```

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building for Production

To build the project for production:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build is optimized for performance and speed.

## Usage

1. **Camera Controls**:
   - **Rotate**: Left-click and drag to orbit around the warehouse
   - **Zoom**: Use mouse wheel to zoom in/out
   - **Pan**: Right-click and drag to pan the view

2. **Robot Observation**:
   - Watch the red robot navigate through warehouse levels
   - Robot follows a systematic pattern visiting each floor
   - Movement is continuous with automatic looping

## Testing

### Unit Tests
```bash
ng test
```

### End-to-End Tests
```bash
ng e2e
```

## Project Structure

```
src/
├── app/
│   ├── app.ts          # Main component with Three.js implementation
│   ├── app.html        # Template with 3D canvas container
│   └── app.scss        # Styling for full-screen 3D view
└── main.ts             # Angular application bootstrap
```

## Future Enhancements

- **Multiple Robots**: Support for multiple autonomous robots
- **Interactive Robot Control**: Click-to-move functionality
- **Warehouse Analytics**: Real-time metrics and statistics
- **Custom Layouts**: User-defined warehouse configurations
- **VR Support**: Virtual reality integration for immersive experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Additional Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Three.js Documentation](https://threejs.org/docs/)
- [Angular Documentation](https://angular.dev/)