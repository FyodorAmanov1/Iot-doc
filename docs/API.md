# Smart Blind Shoes - API Reference

Complete API documentation for the Smart Blind Shoes system, including Arduino Serial communication, Web Dashboard JavaScript API, and data structures.

## Table of Contents

1. [Overview](#overview)
2. [Arduino Serial API](#arduino-serial-api)
3. [Web Dashboard API](#web-dashboard-api)
4. [Data Structures](#data-structures)
5. [Integration Examples](#integration-examples)
6. [Error Handling](#error-handling)

---

## Overview

The Smart Blind Shoes system uses JSON-based serial communication between the Arduino hardware and the web dashboard. The API is designed to be simple, efficient, and real-time.

### Communication Protocol

- **Format**: JSON (JavaScript Object Notation)
- **Baud Rate**: 9600 (default, configurable)
- **Update Frequency**: ~10Hz (100ms intervals)
- **Encoding**: UTF-8

---

## Arduino Serial API

### Output Format

The Arduino continuously outputs sensor data and system status in JSON format via Serial.

#### Sensor Data Output

```json
{
  "sensors": {
    "left": 150,
    "center": 200,
    "right": 180,
    "down": 100
  },
  "zones": {
    "left": "WARN",
    "center": "CLEAR",
    "right": "WARN",
    "down": "CLEAR"
  },
  "closest": {
    "distance": 150,
    "sensor": "left",
    "zone": "WARN"
  },
  "status": {
    "battery": 85,
    "steps": 1234,
    "mode": 0,
    "sensitivity": 50,
    "system": "ACTIVE"
  },
  "haptic": {
    "left": 128,
    "right": 64
  },
  "timestamp": 1705312200000
}
```

#### Field Descriptions

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `sensors.left` | integer | 20-400 | Distance in cm from left sensor |
| `sensors.center` | integer | 20-400 | Distance in cm from center sensor |
| `sensors.right` | integer | 20-400 | Distance in cm from right sensor |
| `sensors.down` | integer | 50-150 | Distance in cm from downward sensor |
| `zones.*` | string | CLEAR/WARN/ALERT/CRITICAL | Zone classification for each sensor |
| `closest.distance` | integer | 20-400 | Distance of closest obstacle |
| `closest.sensor` | string | left/center/right/down | Which sensor detected closest obstacle |
| `closest.zone` | string | CLEAR/WARN/ALERT/CRITICAL | Zone of closest obstacle |
| `status.battery` | integer | 0-100 | Battery level percentage |
| `status.steps` | integer | 0+ | Total step count |
| `status.mode` | integer | 0-2 | Operation mode (0=Normal, 1=Sensitive, 2=Aggressive) |
| `status.sensitivity` | integer | 0-100 | Sensitivity setting |
| `status.system` | string | ACTIVE/STANDBY/ERROR | System status |
| `haptic.left` | integer | 0-255 | Left vibration motor intensity (PWM) |
| `haptic.right` | integer | 0-255 | Right vibration motor intensity (PWM) |
| `timestamp` | integer | Unix timestamp | Milliseconds since epoch |

### Zone Classifications

| Zone | Distance Range | Description | Haptic Feedback |
|------|----------------|-------------|-----------------|
| `CLEAR` | > 150cm | Safe distance, no obstacles | None |
| `WARN` | 80-150cm | Obstacle detected, caution advised | Low intensity (100-150 PWM) |
| `ALERT` | 30-80cm | Close obstacle, immediate attention | Medium intensity (150-200 PWM) |
| `CRITICAL` | < 30cm | Very close obstacle, stop immediately | High intensity (200-255 PWM) + Buzzer |

### Operation Modes

| Mode | Value | Description | Distance Thresholds |
|------|-------|-------------|---------------------|
| Normal | 0 | Standard operation | Base thresholds |
| Sensitive | 1 | Increased sensitivity | Thresholds × 1.5 |
| Aggressive | 2 | Reduced sensitivity | Thresholds × 0.7 |

### Input Commands

The Arduino can receive commands via Serial input (future implementation):

```json
{
  "command": "SET_MODE",
  "value": 1
}
```

#### Available Commands

| Command | Value Type | Description |
|---------|------------|-------------|
| `SET_MODE` | integer (0-2) | Change operation mode |
| `SET_SENSITIVITY` | integer (0-100) | Adjust sensitivity |
| `CALIBRATE` | boolean | Start calibration sequence |
| `EMERGENCY` | boolean | Trigger emergency alert |
| `RESET_STEPS` | boolean | Reset step counter |

---

## Web Dashboard API

### SmartShoesSimulator Class

Main class for simulating sensor data and managing dashboard state.

#### Constructor

```javascript
const simulator = new SmartShoesSimulator();
```

#### Methods

##### `generateSensorData()`

Generates realistic sensor data based on walking scenarios.

```javascript
simulator.generateSensorData();
// Updates: distances, zones, closest obstacle
```

**Returns**: `void`

**Scenarios**:
- Narrow hallway (walls on both sides)
- Approaching obstacle
- Turning left corner
- Turning right corner
- Open space
- Navigating around objects

##### `updateMetrics()`

Updates step count, battery level, and walking speed.

```javascript
simulator.updateMetrics();
// Updates: stepCount, batteryLevel, walkingSpeed
```

**Returns**: `void`

##### `getSensorData()`

Returns current sensor data object.

```javascript
const data = simulator.getSensorData();
// Returns: { distances, zones, closest, status, haptic, timestamp }
```

**Returns**: `Object` - Complete sensor data object

##### `setMode(mode)`

Sets operation mode.

```javascript
simulator.setMode(1); // Set to Sensitive mode
```

**Parameters**:
- `mode` (integer): 0=Normal, 1=Sensitive, 2=Aggressive

**Returns**: `void`

##### `setSensitivity(value)`

Sets sensitivity level.

```javascript
simulator.setSensitivity(75); // 75% sensitivity
```

**Parameters**:
- `value` (integer): 0-100

**Returns**: `void`

##### `triggerEmergency()`

Triggers emergency alert system.

```javascript
simulator.triggerEmergency();
```

**Returns**: `void`

### Dashboard Class

Manages UI updates and chart rendering.

#### Constructor

```javascript
const dashboard = new Dashboard(simulator);
```

**Parameters**:
- `simulator` (SmartShoesSimulator): Simulator instance

#### Methods

##### `updateMetrics()`

Updates all metric displays (steps, battery, speed).

```javascript
dashboard.updateMetrics();
```

**Returns**: `void`

##### `updateSensors()`

Updates sensor readings and zone indicators.

```javascript
dashboard.updateSensors();
```

**Returns**: `void`

##### `updateCharts()`

Updates all Chart.js visualizations.

```javascript
dashboard.updateCharts();
```

**Returns**: `void`

##### `updateGPS()`

Updates GPS location display.

```javascript
dashboard.updateGPS();
```

**Returns**: `void`

##### `triggerEmergency()`

Triggers emergency alert UI.

```javascript
dashboard.triggerEmergency();
```

**Returns**: `void`

##### `changeMode(mode)`

Changes operation mode and updates UI.

```javascript
dashboard.changeMode(1);
```

**Parameters**:
- `mode` (integer): 0-2

**Returns**: `void`

##### `updateSensitivity(value)`

Updates sensitivity slider and applies changes.

```javascript
dashboard.updateSensitivity(75);
```

**Parameters**:
- `value` (integer): 0-100

**Returns**: `void`

### Global Functions

#### `startDemo()`

Starts the real-time dashboard simulation.

```javascript
startDemo();
```

**Returns**: `void`

#### `scrollToSection(sectionId)`

Smoothly scrolls to a page section.

```javascript
scrollToSection('demo');
```

**Parameters**:
- `sectionId` (string): ID of target section

**Returns**: `void`

---

## Data Structures

### SensorData

```typescript
interface SensorData {
  sensors: {
    left: number;      // 20-400 cm
    center: number;    // 20-400 cm
    right: number;     // 20-400 cm
    down: number;      // 50-150 cm
  };
  zones: {
    left: Zone;
    center: Zone;
    right: Zone;
    down: Zone;
  };
  closest: {
    distance: number;
    sensor: 'left' | 'center' | 'right' | 'down';
    zone: Zone;
  };
  status: {
    battery: number;      // 0-100
    steps: number;        // 0+
    mode: number;        // 0-2
    sensitivity: number;  // 0-100
    system: 'ACTIVE' | 'STANDBY' | 'ERROR';
  };
  haptic: {
    left: number;   // 0-255 PWM
    right: number;  // 0-255 PWM
  };
  timestamp: number;  // Unix timestamp (ms)
}
```

### Zone

```typescript
type Zone = 'CLEAR' | 'WARN' | 'ALERT' | 'CRITICAL';
```

### GPSData

```typescript
interface GPSData {
  lat: number;  // Latitude
  lng: number;  // Longitude
}
```

---

## Integration Examples

### Reading Serial Data (Web Serial API)

```javascript
// Request serial port access
const port = await navigator.serial.requestPort();
await port.open({ baudRate: 9600 });

const reader = port.readable.getReader();
const decoder = new TextDecoder();

while (true) {
  const { value, done } = await reader.read();
  if (done) break;
  
  const text = decoder.decode(value);
  const lines = text.split('\n');
  
  for (const line of lines) {
    if (line.trim().startsWith('{')) {
      try {
        const data = JSON.parse(line);
        // Process sensor data
        updateDashboard(data);
      } catch (e) {
        console.error('Parse error:', e);
      }
    }
  }
}
```

### Processing Sensor Data

```javascript
function processSensorData(data) {
  // Update sensor displays
  document.getElementById('sensor-left').textContent = data.sensors.left + ' cm';
  document.getElementById('sensor-center').textContent = data.sensors.center + ' cm';
  document.getElementById('sensor-right').textContent = data.sensors.right + ' cm';
  
  // Update zone indicators
  updateZoneIndicator('left', data.zones.left);
  updateZoneIndicator('center', data.zones.center);
  updateZoneIndicator('right', data.zones.right);
  
  // Check for critical obstacles
  if (data.closest.zone === 'CRITICAL') {
    triggerAlert('Critical obstacle detected!');
  }
}
```

### Sending Commands to Arduino

```javascript
async function sendCommand(command, value) {
  const port = await getSerialPort();
  const encoder = new TextEncoder();
  const commandObj = { command, value };
  const data = encoder.encode(JSON.stringify(commandObj) + '\n');
  
  const writer = port.writable.getWriter();
  await writer.write(data);
  writer.release();
}

// Example: Change mode
sendCommand('SET_MODE', 1);

// Example: Set sensitivity
sendCommand('SET_SENSITIVITY', 75);
```

### Custom Dashboard Integration

```javascript
// Initialize simulator
const simulator = new SmartShoesSimulator();
const dashboard = new Dashboard(simulator);

// Start data generation
setInterval(() => {
  simulator.generateSensorData();
  simulator.updateMetrics();
  
  dashboard.updateMetrics();
  dashboard.updateSensors();
  dashboard.updateCharts();
}, 100); // Update every 100ms
```

---

## Error Handling

### Common Errors

#### Serial Communication Errors

```javascript
try {
  const port = await navigator.serial.requestPort();
  // ... communication code
} catch (error) {
  if (error.name === 'NotFoundError') {
    console.error('No serial port selected');
  } else if (error.name === 'SecurityError') {
    console.error('Serial port access denied');
  } else {
    console.error('Serial error:', error);
  }
}
```

#### JSON Parse Errors

```javascript
function safeParseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Invalid JSON:', jsonString);
    return null;
  }
}
```

#### Sensor Data Validation

```javascript
function validateSensorData(data) {
  if (!data || !data.sensors) {
    return false;
  }
  
  const { left, center, right, down } = data.sensors;
  
  // Validate ranges
  if (left < 20 || left > 400) return false;
  if (center < 20 || center > 400) return false;
  if (right < 20 || right > 400) return false;
  if (down < 50 || down > 150) return false;
  
  return true;
}
```

### Error Response Format

```json
{
  "error": true,
  "code": "SENSOR_ERROR",
  "message": "Left sensor reading out of range",
  "timestamp": 1705312200000
}
```

---

## Rate Limits & Best Practices

### Update Frequency

- **Recommended**: 10Hz (100ms intervals)
- **Maximum**: 20Hz (50ms intervals)
- **Minimum**: 1Hz (1000ms intervals)

### Data Size

- **Typical JSON size**: ~200-300 bytes
- **Maximum recommended**: 1KB per message

### Best Practices

1. **Always validate data** before processing
2. **Handle errors gracefully** - don't crash on invalid data
3. **Use non-blocking code** - avoid `delay()` in Arduino
4. **Implement timeouts** for serial communication
5. **Log errors** for debugging
6. **Test with various scenarios** (hallway, open space, obstacles)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-01-15 | Initial API documentation |

---

## Support

For questions, issues, or contributions:

- **GitHub**: [https://github.com/UsmanovMahmudkhan/Iot-doc](https://github.com/UsmanovMahmudkhan/Iot-doc)
- **Documentation**: See `docs/README.md`
- **Live Demo**: [Wokwi Simulation](https://wokwi.com/projects/449468602181139457)

---

**Last Updated**: January 2024

