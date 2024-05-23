export const makeFormData = (object: object) => {
    const formData = new FormData();

    for (const key in object) {
        const value = object[key];
        if (Array.isArray(value)) {
            formData.append(key + "[]", value);
        } else {
            formData.append(key, value);
        }
    }
    return formData;
};
