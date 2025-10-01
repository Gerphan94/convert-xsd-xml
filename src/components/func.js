export const toSnakeCase = (str) => {
    return str
        .normalize("NFD")                   // split accents from letters
        .replace(/[\u0300-\u036f]/g, "")    // remove accents
        .toLowerCase()                      // convert to lowercase
        .replace(/đ/g, "d")                 // replace special Vietnamese char
        .replace(/[^a-z0-9\s]/g, "")        // remove non-alphanumeric
        .trim()                             // remove spaces at ends
        .replace(/\s+/g, "_")
        .toUpperCase();              // replace spaces with underscores
};