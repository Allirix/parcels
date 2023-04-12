export type SuburbItem = {
  name: string;
  id?: string;
};

export type Suburb = string;

export type Suburbs = Record<string, Suburb>;

export type Location = {
  name: string;
  type: string;
  suburb: Suburb;
};

export type Locations = Record<string, Location>;

export type Position = {
  lat: number;
  lng: number;
};

export type Address = {
  number: string;
  locationId: string;
  position?: Position;
};

export type Addresses = Record<string, Address>;

export type ParcelSize = "S" | "M" | "L";

export type Parcel = {
  count: number;
  color?: string;
  type: string;
  size: ParcelSize;
};

export type Parcels = Parcel[];

export type Delivery = {
  addressId: string;
  parcels: Parcels;
  deliveredAt?: number;
  distance?: number;
  notes?: string;
};

export type FullAddress = Address & Location;
export type FullDelivery = Delivery & FullAddress;

export type Deliveries = Record<string, Delivery>;

export type Route = string[];

export type Shift = {
  startedAt?: number;
  endedAt?: number;
  breakMs: number;
  pauseStartTime?: number;
};

export type History = Record<typeof Shift.startedAt, Deliveries>;
