"use client";

import { PulsingBorder } from "@paper-design/shaders-react";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme();

  // Use resolvedTheme to handle "system" theme preference
  const isDark = resolvedTheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#ffffff";

  return (
    <div className="fixed inset-0 -z-10">
      <PulsingBorder
        className="h-full w-full"
        colors={["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]}
        colorBack={backgroundColor}
        spotsPerColor={3}
        intensity={1.0}
        smoke={0.5}
        scale={1.0}
        roundness={0.0}
        speed={1.5}
      />
    </div>
  );
}
