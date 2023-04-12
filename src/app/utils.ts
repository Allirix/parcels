import type { Address, Delivery, Location, Shift, SuburbItem } from "./types";
import { FullAddress } from "./types";

export function getSuburbId(suburb: SuburbItem | string) {
  return typeof suburb === "object" ? suburb.name : suburb;
}

export function getLocationId({ name, type, suburb }: FullAddress | Location) {
  return `${name} ${type} ${suburb}`;
}

export function getAddressId(address: FullAddress | Address) {
  return `${address.number} ${address.locationId}`.trim();
}

export function getDeliveryId(delivery: Delivery, delivered = false) {
  return delivered
    ? `${delivery.addressId} ${delivery.deliveredAt}`
    : delivery.addressId;
}

export function getShiftId(shift: Shift) {
  return shift.startedAt
    ? new Date(new Date(shift.startedAt).toDateString()).getTime()
    : NaN;
}
