"use client";

import React from "react";

export default function LazySection({ children, height = "300px", className = "" }) {
  return (
    <div
      className={className}
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: `auto ${height}`,
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}
