export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    };
};

export const updateArray = (oldArray, index, updatedValues) => {
    return Object.assign([...oldArray], {[index]: updatedValues});
}

export function getYear(str) {
  const year =  str.split('-')[0];
  return parseInt(year, 10);
}

export function getUniqueYears(data) {
  const uniqueYears = [];

  data.forEach((item) => {
    const maybeUniqueYear = getYear(item.start_date)
    if (!uniqueYears.includes(maybeUniqueYear)) {
      uniqueYears.push(maybeUniqueYear);
    }
  })

  return uniqueYears.sort((a, b) => b - a);
}
