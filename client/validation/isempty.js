const isEmpty = (value) => {
    return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keyes(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
    );
}
module.exports = isEmpty;