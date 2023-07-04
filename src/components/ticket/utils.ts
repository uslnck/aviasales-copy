export const separatedPrice = (price: number) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export const separatedStops = (stops: string[]) => stops.join(", ");

export const suffixedStops = (stopsCount: number) => {
  switch (stopsCount) {
    case 0:
      return "БЕЗ ПЕРЕСАДОК";
    case 1:
      return `${stopsCount} ПЕРЕСАДКА`;
    case 2:
    case 3:
    case 4:
      return `${stopsCount} ПЕРЕСАДКИ`;
    default:
      return `${stopsCount} ПЕРЕСАДОК`;
  }
};
