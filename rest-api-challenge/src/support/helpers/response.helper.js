
function responseFrom(httpStatus, responseData, field = 'data') {
    if (Array.isArray(responseData)) {
        return { status: httpStatus, data: { [field]: responseData } };
    }
    return { status: httpStatus, data: { [field]: responseData } };
}

module.exports = { responseFrom };