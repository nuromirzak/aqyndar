const compareObjectIds = (id1, id2) => {
    return JSON.stringify(id1) === JSON.stringify(id2);
}

module.exports = {
    compareObjectIds,
}