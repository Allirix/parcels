// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";
import {
  Address,
  Delivery,
  Location,
  Parcel,
  Route,
  Suburb,
} from "../../types";
import { getAddressId, getDeliveryId, getLocationId } from "../../utils";
import { colors } from "../../../components/Parcel";
import { typeList } from "../../../components/Parcel";
import { colorList } from "../../../components/Parcel";
import { sizeList } from "../../../components/Parcel";

const MS = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;

export function createArray(count: number, fn: any) {
  return new Array(count).fill({}).map(() => fn());
}

export function getDaysInMs(days = 1) {
  return days * MS * SECONDS * MINUTES * HOURS;
}

export function randCeil(num = 1) {
  return Math.ceil(Math.random() * Math.random() * num);
}

export function randFloor(num = 1) {
  return Math.floor(Math.random() * Math.random() * num);
}

export function createSuburb(): Suburb {
  return faker.address.cityName();
}

export function createLocation(suburb: Suburb = createSuburb()): Location {
  return {
    name: faker.address.streetName(),
    type: faker.address.streetSuffix(),
    suburb,
  };
}

export function createAddress(location: Location = createLocation()): Address {
  return {
    number: faker.address.buildingNumber(),
    locationId: getLocationId(location),
    // -27.445633292043752, 153.06612747998287
    position: {
      lat: faker.datatype.number({
        min: -27.5,
        max: -27.4,
        precision: 0.000001,
      }),
      lng: faker.datatype.number({
        min: 153,
        max: 153.1,
        precision: 0.000001,
      }),
    },
  };
}

export function createParcel(): Parcel {
  return {
    count: Math.ceil(Math.random() * Math.random() * 3),
    color: colorList[randFloor(colorList.length)],
    type: typeList[randFloor(typeList.length)],
    size: sizeList[randFloor(sizeList.length)] as "S" | "M" | "L",
  };
}

const defaultDeliveryOptions = {
  dateFrom: new Date(Date.now() - getDaysInMs(1)),
  dateTo: Date.now(),
  randomize: false,
};
type DeliveryOptions = typeof defaultDeliveryOptions;

export function createDelivery(
  address: Address,
  options: DeliveryOptions = {} as DeliveryOptions
): Delivery {
  const { dateFrom, dateTo, randomize } = {
    ...defaultDeliveryOptions,
    ...options,
  };

  const parcels = new Array(randCeil(4)).fill(0).map(() => createParcel());

  let deliveredAt: number | undefined;
  if (!randomize) deliveredAt = faker.date.between(dateFrom, dateTo).getTime();
  else {
    const shouldDeliver = Math.random() > 0.5;
    if (shouldDeliver)
      deliveredAt = faker.date.between(dateFrom, dateTo).getTime();
  }

  return {
    addressId: getAddressId(address),
    parcels,
    ...(deliveredAt ? { deliveredAt } : {}),
    notes: "Test Notes...",
  };
}

const SUBURBS = 10;
const LOCATIONS = 2000;
const ADDRESSES = 10000;
const DELIVERIES = 200;

const suburbArr = createArray(SUBURBS, () => createSuburb());

const locationArr = createArray(LOCATIONS, () =>
  createLocation(suburbArr[randFloor(SUBURBS)])
);

const addressArr = createArray(ADDRESSES, () =>
  createAddress(locationArr[randFloor(LOCATIONS)])
);

const deliveryArr = createArray(DELIVERIES, () =>
  createDelivery(addressArr[randFloor(ADDRESSES)], {
    randomize: true,
  } as DeliveryOptions)
);

function reduce<T>(getId: (obj: T) => string) {
  return (acc: Record<string | number, T>, e: T) => {
    acc[getId(e)] = e;
    return acc;
  };
}

export const suburbs = suburbArr.reduce(
  reduce((name) => name),
  {}
);
export const locations = locationArr.reduce(reduce(getLocationId), {});
export const addresses = addressArr.reduce(reduce(getAddressId), {});
export const deliveries = deliveryArr.reduce(reduce(getDeliveryId), {});

export const route: Route = Object.keys(deliveries)
  .sort(() => Math.random() - 0.5)
  .slice(0, 5);
