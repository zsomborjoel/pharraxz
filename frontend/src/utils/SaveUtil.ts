export const isSaveEnabled = <T extends object>(
    referenceObject: T,
    currentObject: T | null,
    mandatoryFields: (keyof T)[]
): boolean => {
    if (!currentObject) return false;

    const mandatoryExists = mandatoryFields.every((field) => {
        if (!currentObject[field]) return false;

        if (Array.isArray(currentObject[field])) {
            if ((currentObject[field] as any).length === 0) return false;
        }

        return true;
    });

    const hasDataChanged =
        (Object.keys(referenceObject) as Array<keyof T>).some(
            (field) => referenceObject[field] !== currentObject[field]
        ) || Object.keys(referenceObject).length === 0;

    return mandatoryExists && hasDataChanged;
};

const SaveUtil = {
    isSaveEnabled,
};

export default SaveUtil;
