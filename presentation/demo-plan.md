# Live Demo Execution Plan

## Pre-Demo Checklist

- [ ] Test dashboard on presentation computer
- [ ] Verify internet connection for CDN resources
- [ ] Have backup screenshots ready
- [ ] Test emergency button functionality
- [ ] Verify all charts render correctly
- [ ] Check responsive design on different screen sizes

## Demo Flow (5-7 minutes)

### 1. Introduction (30 seconds)
- Open the web dashboard
- Show the homepage with project overview
- Highlight the modern, Apple/Stripe-inspired design

### 2. Dashboard Overview (1 minute)
- Navigate to Dashboard section
- Explain the real-time data visualization
- Show the four sensor cards (Left, Center, Right, Down)
- Point out the zone classifications (CLEAR, WARN, ALERT, CRIT)

### 3. Live Data Demonstration (2 minutes)
- Click "Start Live Demo" button
- Show sensors updating in real-time
- Explain how distances change as obstacles are detected
- Demonstrate zone changes (watch CLEAR → WARN → ALERT)
- Show the active sensor highlighting

### 4. Charts and Metrics (1 minute)
- Show the distance over time chart
- Explain the three sensor lines (Left/Center/Right)
- Show GPS coordinates updating
- Display step count, battery level, walking speed

### 5. System Controls (1 minute)
- Change operation mode (Normal/Sensitive/Aggressive)
- Adjust sensitivity slider
- Show how it affects detection thresholds
- Demonstrate emergency button (with notification)

### 6. Features Overview (1 minute)
- Scroll through Features section
- Show responsive design (if on mobile/tablet)
- Highlight key benefits
- Show team member responsibilities

### 7. GitHub Repository (30 seconds)
- Open GitHub repository
- Show code structure
- Highlight key files
- Show commit history

## Backup Plan

If live demo fails:
1. Use pre-recorded video
2. Show screenshots of dashboard
3. Explain functionality verbally
4. Use static images from presentation

## Key Points to Emphasize

1. **Real-time updates** - Data refreshes every 500ms
2. **Modern design** - Apple/Stripe inspired UI
3. **Comprehensive monitoring** - All sensors visible
4. **User control** - Adjustable settings
5. **Emergency system** - Quick access to help

## Technical Details to Mention

- JavaScript-based simulation
- Chart.js for visualization
- Responsive CSS design
- Future: Web Serial API for hardware connection
- Scalable architecture

## Q&A Preparation

**Q: How does it connect to real hardware?**
A: Currently uses simulation. Future implementation will use Web Serial API for direct browser-to-Arduino communication.

**Q: Can it work offline?**
A: Yes, once loaded, the dashboard works offline. Only Chart.js CDN requires internet.

**Q: What browsers are supported?**
A: All modern browsers (Chrome, Firefox, Safari, Edge).

**Q: Is the data stored?**
A: Currently no persistence. Future versions will include local storage or cloud database.

**Q: How accurate is the simulation?**
A: Simulates realistic sensor behavior with noise and variation similar to real hardware.

