export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    };
};

export const updateArray = (oldArray, index, updatedValues) => {
    return Object.assign([...oldArray], {[index]: updatedValues});
}