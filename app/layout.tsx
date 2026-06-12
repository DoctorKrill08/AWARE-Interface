'use client'
import React, { useState } from "react";

type TelemetryData = {
  mode: string;
  battery: number;
  longitude: number;
  latitude: number;
  heading: number;
  status: string;
};

const RobotControlPanel: React.FC = () => {
  const [telemetry] = useState<TelemetryData>({
    mode: "OFF",
    battery: 0,
    longitude: 0,
    latitude: 0,
    heading: 0,
    status: "Idle",
  });

  const sendCommand = (command: string) => {
    console.log(`Sending command: ${command}`);

    // Example for future:
    // fetch("/api/command", {
    //   method: "POST",
    //   body: JSON.stringify({ command }),
    // });
  };

  return (
    <html>
      <body>
        <div style={styles.container}>
          {/* Telemetry Section */}
          <div style={styles.panel}>
            <h2>Telemetry</h2>

            <div style={styles.telemetryItem}>
              <strong>Mode:</strong> {telemetry.mode}
            </div>

            <div style={styles.telemetryItem}>
              <strong>Battery:</strong> {telemetry.battery}%
            </div>

            <div style={styles.telemetryItem}>
              <strong>Longitude:</strong> {telemetry.longitude}
            </div>

            <div style={styles.telemetryItem}>
              <strong>Latitude:</strong> {telemetry.latitude}
            </div>

            <div style={styles.telemetryItem}>
              <strong>Heading:</strong> {telemetry.heading}
            </div>

            <div style={styles.telemetryItem}>
              <strong>Status:</strong> {telemetry.status}
            </div>
          </div>

          {/* Command Section */}
          <div style={styles.panel}>
            <h2>Command</h2>

            <div style={styles.buttonGrid}>
              <button onClick={() => sendCommand("OFF")}>Off</button>

              <button onClick={() => sendCommand("MANUAL")}>
                Manual
              </button>

              <button onClick={() => sendCommand("AUTONOMOUS")}>
                Autonomous
              </button>

              <button onClick={() => sendCommand("SAVE")}>Save</button>

              <button onClick={() => sendCommand("LOAD")}>Load</button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    minHeight: "100vh",
    boxSizing: "border-box",
  },

  panel: {
    flex: 1,
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
  },

  telemetryItem: {
    marginBottom: "12px",
    fontSize: "16px",
  },

  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "10px",
  },
};

export default RobotControlPanel;