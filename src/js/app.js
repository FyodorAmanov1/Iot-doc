// ============================================
// Smart Blind Shoes - Real-Time Dashboard
// ============================================

// Simulated data generator (replace with real API calls)
class SmartShoesSimulator {
    constructor() {
        this.stepCount = 0;
        this.batteryLevel = 100;
        this.walkingSpeed = 0.0;
        this.distances = {
            left: 400,
            center: 400,
            right: 400,
            down: 100
        };
        this.gps = {
            lat: 37.5514,
            lng: 127.0748
        };
        this.systemStatus = 'Active';
        this.operationMode = 0;
        this.sensitivity = 50;
        this.distanceHistory = [];
        this.maxHistoryLength = 20;
    }

    // Generate realistic sensor data with enhanced scenarios
    generateSensorData() {
        const now = Date.now();
        const time = now / 1000;
        
        // Enhanced realistic walking scenarios with more variety
        // Scenario 1: Walking in narrow hallway
        // Scenario 2: Approaching wall/obstacle
        // Scenario 3: Turning left corner
        // Scenario 4: Turning right corner
        // Scenario 5: Open space/park
        // Scenario 6: Navigating around objects
        
        const scenario = Math.floor(time / 8) % 6;
        const scenarioProgress = (time % 8) / 8;
        
        switch(scenario) {
            case 0: // Narrow hallway - walls on both sides
                this.distances.left = 60 + Math.sin(time * 0.8) * 8 + (Math.random() - 0.5) * 4;
                this.distances.center = 280 + Math.sin(time * 0.4) * 25 + (Math.random() - 0.5) * 6;
                this.distances.right = 65 + Math.sin(time * 0.8 + 1.5) * 8 + (Math.random() - 0.5) * 4;
                this.distances.down = 100 + (Math.random() - 0.5) * 3;
                break;
                
            case 1: // Approaching obstacle - critical warning
                const approachDist = 300 - (scenarioProgress * 270);
                this.distances.center = Math.max(25, approachDist);
                this.distances.left = 120 + Math.sin(time * 1.2) * 15 + (Math.random() - 0.5) * 8;
                this.distances.right = 115 + Math.sin(time * 1.2 + 2) * 15 + (Math.random() - 0.5) * 8;
                this.distances.down = 98 + (Math.random() - 0.5) * 4;
                break;
                
            case 2: // Turning left corner - left sensor detects wall
                this.distances.left = 45 + Math.sin(time * 1.5) * 15 + (Math.random() - 0.5) * 5;
                this.distances.center = 200 + Math.sin(time * 0.6) * 35 + (Math.random() - 0.5) * 10;
                this.distances.right = 250 + Math.sin(time * 0.4) * 45 + (Math.random() - 0.5) * 12;
                this.distances.down = 102 + (Math.random() - 0.5) * 3;
                break;
                
            case 3: // Turning right corner - right sensor detects wall
                this.distances.left = 240 + Math.sin(time * 0.4) * 40 + (Math.random() - 0.5) * 12;
                this.distances.center = 190 + Math.sin(time * 0.6) * 30 + (Math.random() - 0.5) * 10;
                this.distances.right = 50 + Math.sin(time * 1.5 + 1) * 15 + (Math.random() - 0.5) * 5;
                this.distances.down = 99 + (Math.random() - 0.5) * 3;
                break;
                
            case 4: // Open space - park or large room
                this.distances.left = 380 + Math.sin(time * 0.15) * 15 + (Math.random() - 0.5) * 10;
                this.distances.center = 395 + Math.sin(time * 0.12) * 5 + (Math.random() - 0.5) * 8;
                this.distances.right = 375 + Math.sin(time * 0.15 + 0.5) * 15 + (Math.random() - 0.5) * 10;
                this.distances.down = 105 + (Math.random() - 0.5) * 5;
                break;
                
            case 5: // Navigating around objects - varying distances
                this.distances.left = 90 + Math.sin(time * 0.7) * 40 + (Math.random() - 0.5) * 8;
                this.distances.center = 150 + Math.sin(time * 0.5) * 60 + (Math.random() - 0.5) * 12;
                this.distances.right = 110 + Math.sin(time * 0.7 + 1) * 35 + (Math.random() - 0.5) * 8;
                this.distances.down = 100 + Math.sin(time * 0.3) * 8 + (Math.random() - 0.5) * 4;
                break;
        }
        
        // Ensure values are within valid range
        this.distances.left = Math.max(20, Math.min(400, this.distances.left));
        this.distances.center = Math.max(20, Math.min(400, this.distances.center));
        this.distances.right = Math.max(20, Math.min(400, this.distances.right));
        this.distances.down = Math.max(50, Math.min(150, this.distances.down));
        
        // Add realistic noise for sensor accuracy
        this.distances.left = Math.round(this.distances.left);
        this.distances.center = Math.round(this.distances.center);
        this.distances.right = Math.round(this.distances.right);
        this.distances.down = Math.round(this.distances.down);
        
        // Add to history for chart
        this.distanceHistory.push({
            time: new Date(),
            left: this.distances.left,
            center: this.distances.center,
            right: this.distances.right
        });
        
        if (this.distanceHistory.length > this.maxHistoryLength) {
            this.distanceHistory.shift();
        }
    }

    // Update step count - more realistic walking pattern
    updateSteps() {
        // Simulate walking pattern - steps occur when moving
        const isMoving = this.distances.center < 200; // More likely to step when obstacles detected
        
        if (isMoving && Math.random() > 0.6) {
            // Normal walking: 1-2 steps per update
            // Faster when clear path: 2-3 steps
            const stepRate = this.distances.center > 150 ? 2 : 1;
            this.stepCount += Math.floor(Math.random() * stepRate) + 1;
        } else if (!isMoving && Math.random() > 0.85) {
            // Occasional steps even when stationary
            this.stepCount += 1;
        }
    }

    // Update battery (slowly drains)
    updateBattery() {
        if (Math.random() > 0.95) {
            this.batteryLevel = Math.max(0, this.batteryLevel - 0.1);
        }
    }

    // Update walking speed - realistic based on obstacles
    updateSpeed() {
        // Speed varies based on obstacle proximity
        const closestDist = Math.min(this.distances.left, this.distances.center, this.distances.right);
        
        let baseSpeed;
        if (closestDist > 200) {
            // Clear path - faster walking
            baseSpeed = 4.0 + Math.random() * 1.5;
        } else if (closestDist > 100) {
            // Some obstacles - moderate speed
            baseSpeed = 2.5 + Math.random() * 1.5;
        } else if (closestDist > 50) {
            // Close obstacles - slow down
            baseSpeed = 1.0 + Math.random() * 1.0;
        } else {
            // Very close - very slow/cautious
            baseSpeed = 0.3 + Math.random() * 0.7;
        }
        
        this.walkingSpeed = parseFloat(baseSpeed.toFixed(1));
    }

    // Update GPS (simulate realistic movement)
    updateGPS() {
        // Simulate walking movement - GPS changes based on speed
        const movementFactor = this.walkingSpeed / 100000; // Convert km/h to degrees
        
        // Simulate walking in a direction (north-east)
        this.gps.lat += movementFactor * 0.8 + (Math.random() - 0.5) * movementFactor * 0.2;
        this.gps.lng += movementFactor * 1.2 + (Math.random() - 0.5) * movementFactor * 0.2;
        
        // Keep within reasonable bounds (Seoul area)
        this.gps.lat = Math.max(37.4, Math.min(37.7, this.gps.lat));
        this.gps.lng = Math.max(126.9, Math.min(127.2, this.gps.lng));
    }

    // Get zone based on distance
    getZone(distance) {
        if (distance < 30) return 'CRIT';
        if (distance < 80) return 'ALERT';
        if (distance < 150) return 'WARN';
        return 'CLEAR';
    }
}

// Dashboard Manager
class Dashboard {
    constructor() {
        this.simulator = new SmartShoesSimulator();
        this.chart = null;
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initChart();
        this.startUpdates();
        this.updateAll();
    }

    setupEventListeners() {
        // Operation mode change
        document.getElementById('operationMode').addEventListener('change', (e) => {
            this.simulator.operationMode = parseInt(e.target.value);
            const modeNames = ['Normal', 'Sensitive', 'Aggressive'];
            const modeDescriptions = [
                'Standard detection mode - balanced sensitivity',
                'High sensitivity mode - detects obstacles earlier',
                'Lower sensitivity - for faster movement'
            ];
            this.showNotification(`Mode: ${modeNames[e.target.value]} - ${modeDescriptions[e.target.value]}`);
        });

        // Sensitivity slider
        const sensitivitySlider = document.getElementById('sensitivity');
        sensitivitySlider.addEventListener('input', (e) => {
            this.simulator.sensitivity = parseInt(e.target.value);
            document.getElementById('sensitivityValue').textContent = `${e.target.value}%`;
        });

        // Emergency button
        document.getElementById('emergencyBtn').addEventListener('click', () => {
            this.triggerEmergency();
        });
    }

    initChart() {
        const ctx = document.getElementById('distanceChart');
        if (!ctx) return;

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Left',
                        data: [],
                        borderColor: '#007AFF',
                        backgroundColor: 'rgba(0, 122, 255, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Center',
                        data: [],
                        borderColor: '#34C759',
                        backgroundColor: 'rgba(52, 199, 89, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Right',
                        data: [],
                        borderColor: '#FF9500',
                        backgroundColor: 'rgba(255, 149, 0, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 400,
                        title: {
                            display: true,
                            text: 'Distance (cm)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    }
                }
            }
        });
    }

    startUpdates() {
        // Update sensor data every 500ms
        setInterval(() => {
            this.simulator.generateSensorData();
            this.updateSensors();
            this.updateChart();
        }, 500);

        // Update other metrics every 2 seconds
        setInterval(() => {
            this.simulator.updateSteps();
            this.simulator.updateBattery();
            this.simulator.updateSpeed();
            this.simulator.updateGPS();
            this.updateMetrics();
        }, 2000);
    }

    updateAll() {
        this.updateMetrics();
        this.updateSensors();
        this.updateChart();
    }

    updateMetrics() {
        // Step count
        document.getElementById('stepCount').textContent = this.simulator.stepCount;
        
        // Battery
        const battery = Math.round(this.simulator.batteryLevel);
        document.getElementById('batteryLevel').textContent = `${battery}%`;
        document.getElementById('batteryFill').style.width = `${battery}%`;
        
        // Walking speed
        document.getElementById('walkingSpeed').textContent = this.simulator.walkingSpeed;
        
        // System status
        document.getElementById('systemStatus').textContent = this.simulator.systemStatus;
    }

    updateSensors() {
        const sensors = [
            { id: 'left', element: 'sensorLeft', distance: 'distanceLeft', zone: 'zoneLeft' },
            { id: 'center', element: 'sensorCenter', distance: 'distanceCenter', zone: 'zoneCenter' },
            { id: 'right', element: 'sensorRight', distance: 'distanceRight', zone: 'zoneRight' },
            { id: 'down', element: 'sensorDown', distance: 'distanceDown', zone: 'zoneDown' }
        ];

        sensors.forEach(sensor => {
            const distance = Math.round(this.simulator.distances[sensor.id]);
            const zone = this.simulator.getZone(distance);
            
            document.getElementById(sensor.distance).textContent = distance;
            
            const zoneElement = document.getElementById(sensor.zone);
            zoneElement.textContent = zone;
            zoneElement.className = `sensor-zone ${zone}`;
            
            // Highlight active sensor (closest obstacle)
            const sensorCard = document.getElementById(sensor.element);
            const closestSensor = this.getClosestSensor();
            if (sensor.id === closestSensor) {
                sensorCard.classList.add('active');
            } else {
                sensorCard.classList.remove('active');
            }
        });

        // Update GPS
        document.getElementById('gpsLat').textContent = this.simulator.gps.lat.toFixed(4) + '°';
        document.getElementById('gpsLng').textContent = this.simulator.gps.lng.toFixed(4) + '°';
        
        // Update scenario indicator
        this.updateScenarioIndicator();
    }
    
    updateScenarioIndicator() {
        const time = Date.now() / 1000;
        const scenario = Math.floor(time / 8) % 6;
        const scenarioNames = [
            'Narrow Hallway',
            'Approaching Obstacle',
            'Turning Left Corner',
            'Turning Right Corner',
            'Open Space',
            'Navigating Around Objects'
        ];
        
        const scenarioElement = document.getElementById('scenarioName');
        if (scenarioElement) {
            scenarioElement.textContent = scenarioNames[scenario];
        }
    }

    getClosestSensor() {
        const distances = this.simulator.distances;
        const minDistance = Math.min(distances.left, distances.center, distances.right);
        
        if (minDistance === distances.center) return 'center';
        if (minDistance === distances.left) return 'left';
        return 'right';
    }

    updateChart() {
        if (!this.chart) return;

        const history = this.simulator.distanceHistory;
        const labels = history.map((_, i) => i);
        
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = history.map(h => h.left);
        this.chart.data.datasets[1].data = history.map(h => h.center);
        this.chart.data.datasets[2].data = history.map(h => h.right);
        
        this.chart.update('none'); // 'none' mode for smooth updates
    }

    triggerEmergency() {
        this.showNotification('Emergency alert activated! GPS location shared with emergency contacts.', 'danger');
        
        // Visual feedback
        const btn = document.getElementById('emergencyBtn');
        btn.style.animation = 'pulse 0.5s';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
        
        // Friendly message
        setTimeout(() => {
            this.showNotification('Help is on the way. Stay calm and stay safe.', 'info');
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Create friendly notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Add custom icon based on type
        const iconSvg = type === 'danger' 
            ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>'
            : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                ${iconSvg}
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'danger' ? '#FF3B30' : '#007AFF'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            font-size: 14px;
            max-width: 350px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Initialize dashboard when page loads
let dashboard;

function startDemo() {
    // Redirect to Wokwi simulation
    window.open('https://wokwi.com/projects/449468602181139457', '_blank');
    
    // Also start local dashboard and scroll to it
    if (!dashboard) {
        dashboard = new Dashboard();
    }
    scrollToSection('demo');
}

// Scroll to section function (can be called from HTML)
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        // If scrolling to demo section, start dashboard
        if (sectionId === 'demo' && !dashboard) {
            setTimeout(() => {
                dashboard = new Dashboard();
            }, 500);
        }
    }
}

// Initialize smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's an external link or empty
            if (!href || href === '#' || href.startsWith('http')) {
                return;
            }
            
            e.preventDefault();
            
            const sectionId = href.substring(1); // Remove #
            scrollToSection(sectionId);
        });
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load - DON'T auto-start dashboard
document.addEventListener('DOMContentLoaded', () => {
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Dashboard will start when user scrolls to demo section or clicks button
});

