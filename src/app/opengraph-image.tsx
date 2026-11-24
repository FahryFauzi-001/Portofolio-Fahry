import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F6F4EF",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: 28,
            color: "#0E0E0E",
            fontWeight: 900,
          }}
        >
          <span>MFF.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 78,
              fontWeight: 800,
              color: "#0E0E0E",
              lineHeight: 1.04,
            }}
          >
            {profile.name}
          </div>
          <div style={{ fontSize: 30, color: "#5E5B55", maxWidth: "900px" }}>
            {`${profile.university} · Computer Science`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "16px",
            fontSize: 22,
            color: "#6B6861",
          }}
        >
          <span>Mobile</span>
          <span>·</span>
          <span>Computer Vision</span>
          <span>·</span>
          <span>Web</span>
          <span>·</span>
          <span>IoT</span>
          <span>·</span>
          <span>Machine Learning</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
