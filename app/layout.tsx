'use client'
import React, { useEffect, useRef, useState } from "react";
import './globals.css'


type TelemetryData = {
  mode: string;
  battery: number;
  longitude: number;
  latitude: number;
  heading: number;
  status: string;
};

export default function RobotControlPanel() {
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    mode: "RESTING",
    battery: 0,
    longitude: 0,
    latitude: 0,
    heading: 0,
    status: "Disconnected",
  });

  const [connected, setConnected] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://10.54.132.29:8000/ws");

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to robot");
      setConnected(true);
    };

    socket.onclose = () => {
      console.log("Disconnected from robot");
      setConnected(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "telemetry") {
        setTelemetry({
          mode: data.mode,
          battery: data.battery,
          longitude: data.longitude,
          latitude: data.latitude,
          heading: data.heading,
          status: data.status,
        });
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendCommand = (command: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.warn("Socket not connected");
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        type: "command",
        command: command,
      })
    );
  };


  return (
    <html>
      <body className="background">
        <div>

          {/* Telemetry Section */}
          <div>
            <h2>Telemetry</h2>

            <div>
              <strong>Connection:</strong>{" "}
              {connected ? "Connected" : "Disconnected"}
            </div>

            <div>
              <strong>Mode:</strong> {telemetry.mode}
            </div>

            <div>
              <strong>Battery:</strong> {telemetry.battery}
            </div>

            <div>
              <strong>Longitude:</strong> {telemetry.longitude}
            </div>

            <div>
              <strong>Latitude:</strong> {telemetry.latitude}
            </div>

            <div>
              <strong>Heading:</strong> {telemetry.heading}
            </div>

            <div>
              <strong>Status:</strong> {telemetry.status}
            </div>
          </div>

          {/* Command Section */}
          <div>
            <h2>Command</h2>

            <div>
              <button onClick={() => sendCommand("OFF")}>
                Off
              </button>
              <button onClick={() => sendCommand("RESTING")}>
                Resting
              </button>

              <button onClick={() => sendCommand("GAMEPAD")}>
                Manual
              </button>

              <button onClick={() => sendCommand("AUTONOMOUS")}>
                Autonomous
              </button>
            </div>
          </div>

        </div>
      </body>
    </html>
  );
}