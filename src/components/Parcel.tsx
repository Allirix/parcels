import { ReactElement } from "react";
import { FaShoppingBag, FaTruckLoading } from "react-icons/fa";
import { Parcel as ParcelType } from "../app/types";
import { hasLightColor } from "./utils";

export const types: Record<string, ReactElement | null> = {
  BOX: null, //<FaBox />,
  BAG: <FaShoppingBag />,
  PICKUP: <FaTruckLoading />,
};

export const typeList = Object.keys(types);

export const colors: Record<string, string> = {
  KMART: "linear-gradient(90deg, #FF3B3B 50%, rgba(55,66,253,1) 50%)",
  TARGET:
    "radial-gradient(circle, rgb(230,230,230) 15%, rgba(255,0,0,1) 15%, rgba(255,0,0,1) 33%, rgba(245,245,255,1) 33%, rgb(230,230,230) 65%, rgba(255,0,0,1) 66%, rgba(255,0,0,1) 85%, rgb(230,230,230) 85%)",
  MYER: "linear-gradient(0deg, rgba(0,0,0,1) 33%, rgb(230,230,230) 33%, rgb(230,230,230) 66%, rgba(0,0,0,1) 66%)",
  OTHER:
    "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)",

  BROWN: "rgb(148, 84, 27)",
  TP: "radial-gradient(circle, rgba(154,123,79,1) 19%, rgba(227,193,145,1) 100%)",
  RED: "#FF3B3B",
  BLUE: "#1D45CC",
  GREEN: "#24BD24",
  YELLOW: "#e6ba00",
  PICKUP: "radial-gradient(circle, red 19%, yellow 100%)",
  WHITE: "rgb(230,230,230)",
};

export const colorList = Object.keys(colors);

export const sizeList = ["S", "M", "L"];

export default function Parcel({ count, size, type, color }: ParcelType) {
  const parcelColor = colors[color.toUpperCase()] ?? "white";

  const isLight = hasLightColor(parcelColor, 200);

  const parcelType = types[type.toUpperCase()] ?? null;

  return (
    <div
      className="text-white w-16 h-16 flex flex-col items-center justify-center space-y-0  font-bold text-xl"
      style={{
        background: parcelColor,
        color: isLight ? "black" : "white",
        textShadow: isLight ? "0px 0px 1px white" : "",
        zIndex: 10,
      }}
    >
      {(size !== "M" || count !== 1 || type !== "BOX") && (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            background: isLight ? "rgba(255,255,255,1)" : "",
            minWidth: "30px",
            borderRadius: "10px",
            padding: "5px",
          }}
        >
          <div className="flex">
            <span>{parcelType}</span>
            <span>{size === "M" ? "" : size}</span>
          </div>
          <span className="text-xs">{count === 1 ? null : "x" + count}</span>
        </div>
      )}
    </div>
  );
}
