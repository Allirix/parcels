import { getAddressId, getLocationId } from "../../app/utils";

export function splitAddress(str: string): {
  number: string;
  locationId: string;
} {
  const regex = /^(?=.*\d).*?\s/;
  const match = str.match(regex);
  if (match) {
    const divider = match[0].length;
    const first = str.slice(0, divider);
    const second = str.slice(divider);

    return { number: first.trim(), locationId: second.trim() };
  }

  return { number: "", locationId: str.trim() };
}
const NUM_ITEMS_SHOWN = 5;

export function filterAddressList(addressList, locationList, inputValue) {
  const { number, locationId } = splitAddress(inputValue);
  const addressIdPartial = getAddressId({ number, locationId }).toLowerCase();

  const uniqueAddressMap = new Map();
  locationList.forEach((location) => {
    const id = getAddressId({
      ...location,
      number,
      locationId: getLocationId(location),
    });
    uniqueAddressMap.set(id, { ...location, number, locationId });
  });
  addressList.forEach((address) =>
    uniqueAddressMap.set(getAddressId(address), { ...address, isNew: false })
  );
  const filteredOptions = Array.from(uniqueAddressMap)
    .filter(
      ([addressId]) =>
        addressId.slice(0, addressIdPartial.length).toLowerCase() ===
        addressIdPartial
    )
    .slice(0, NUM_ITEMS_SHOWN)
    .map(([, value]) => value);
  return filteredOptions;
}
