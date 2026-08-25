import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to bottom, #030007, #12091f)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#F5C371",
          }}
        >
          TheDailyRiddle
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#c9c9c9",
            marginTop: 24,
          }}
        >
          A new riddle every day. How many can you solve?
        </div>
      </div>
    ),
    { ...size }
  );
}
