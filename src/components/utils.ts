import { useEffect, useState, useRef, useCallback } from "react";

export function hasLightColor(colorString: string, threshold: number) {
  // Check if the input is a valid CSS gradient or color string
  const isGradient =
    colorString.startsWith("linear-gradient") ||
    colorString.startsWith("radial-gradient");

  // Create a temporary div element to apply the gradient or color and extract the colors
  const div = document.createElement("div");
  div.style.background = colorString;
  document.body.appendChild(div);

  // Extract the colors from the gradient or color
  const regex = /rgb\(.+?\)|#[A-Fa-f0-9]{6}/g;
  const gradientColors = isGradient
    ? window.getComputedStyle(div).background.match(regex)
    : [colorString];

  if (!gradientColors) return false;

  // Check if any of the colors are close to white
  const isLight = gradientColors.some((color) => {
    let r;
    let g;
    let b;
    if (color.startsWith("#")) {
      // Convert the hexadecimal color to RGB
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else {
      // Extract the RGB values from the CSS color string
      [r, g, b] = color.match(/\d+/g);
    }
    return (
      Number(r) > threshold && Number(g) > threshold && Number(b) > threshold
    );
  });

  // Remove the temporary div element from the document
  document.body.removeChild(div);

  return isLight;
}

export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<number>();

  return useCallback(
    ((...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    }) as T,
    [callback, delay]
  );
}
