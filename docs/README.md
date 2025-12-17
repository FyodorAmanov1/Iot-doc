# Smart Blind Shoes - Technical Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Hardware Specifications](#hardware-specifications)
3. [Software Architecture](#software-architecture)
4. [API Reference](#api-reference)
5. [Data Flow](#data-flow)
6. [Deployment Guide](#deployment-guide)
7. [Troubleshooting](#troubleshooting)

## System Overview

### Purpose
Smart Blind Shoes is an assistive technology system designed to help visually impaired individuals navigate safely through obstacle detection and haptic feedback.

### Components
1. **Hardware**: Arduino Uno with sensors and actuators
2. **Firmware**: C++ code running on Arduino
3. **Web Interface**: JavaScript-based dashboard for monitoring

## Hardware Specifications

### Microcontroller
- **Model**: Arduino Uno R3
- **Processor**: ATmega328P
- **Clock Speed**: 16 MHz
- **Flash Memory**: 32 KB
- **SRAM**: 2 KB

### Sensors
- **Ultrasonic Sensors (HC-SR04)**: 4 units
  - Detection Range: 2cm - 400cm
  - Accuracy: ±3mm
  - Operating Voltage: 5V

### Actuators
- **Vibration Motors**: 2 units (Left/Right)
- **Buzzer**: 1 unit for audio feedback
- **RGB LED**: Status indication

### Communication
- **Serial Communication**: USB (for web interface)
- **I2C**: LCD display, RTC module
- **GPIO**: Direct sensor and actuator control

## Software Architecture

### Firmware (Arduino)
- **Language**: C++
- **Main Libraries**:
  - `LiquidCrystal_I2C` - LCD control
  - `Wire` - I2C communication
  - Built-in Arduino libraries

### Web Interface
- **Language**: JavaScript (ES6+)
- **Libraries**:
  - Chart.js - Data visualization
  - Web Serial API - Hardware communication (future)

### Data Format
```json
{
  "sensors": {
    "left": 150,
    "center": 200,
    "right": 180,
    "down": 100
  },
  "status": {
    "battery": 85,
    "steps": 1234,
    "speed": 3.5,
    "mode": 0
  },
  "gps": {
    "lat": 37.5514,
    "lng": 127.0748
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## API Reference

### Web Dashboard API

#### `startDemo()`
Starts the real-time data simulation.

```javascript
startDemo();
```

#### `updateMetrics()`
Updates all dashboard metrics (steps, battery, speed).

```javascript
dashboard.updateMetrics();
```

#### `updateSensors()`
Updates sensor readings and zone classifications.

```javascript
dashboard.updateSensors();
```

#### `triggerEmergency()`
Triggers emergency alert system.

```javascript
dashboard.triggerEmergency();
```

## Data Flow

### Sensor Reading Flow
```
1. Ultrasonic Sensor → Trigger Pulse
2. Echo Received → Calculate Distance
3. Apply Filtering Algorithm
4. Determine Zone (Clear/Warn/Alert/Critical)
5. Update Haptic Feedback
6. Send Data to Web Dashboard
```

### Web Dashboard Flow
```
1. Receive Sensor Data (Simulated/Serial)
2. Update UI Elements
3. Update Charts
4. Process User Controls
5. Send Commands to Hardware (if connected)
```

## Deployment Guide

### Local Development
1. Clone repository
2. Open `index.html` in browser
3. No build process required

### Web Hosting
1. Upload all files to web server
2. Ensure `index.html` is in root directory
3. Configure CORS if needed for API calls

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select branch and folder
4. Access via `https://username.github.io/repository-name`

## Troubleshooting

### Common Issues

**Dashboard not updating:**
- Check browser console for errors
- Ensure JavaScript is enabled
- Verify Chart.js is loaded

**Sensor data not displaying:**
- Check simulator is running
- Verify element IDs match in HTML/JS
- Check browser console for errors

**Charts not rendering:**
- Verify Chart.js CDN is accessible
- Check canvas element exists
- Ensure data format is correct

## Future Enhancements

- [ ] Real hardware integration via Web Serial API
- [ ] User authentication system
- [ ] Historical data storage
- [ ] Mobile app companion
- [ ] Machine learning for obstacle classification
- [ ] Voice navigation assistance

