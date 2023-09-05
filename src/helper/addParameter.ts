function addParameter(url: string, parameters:any) {
    const separator = url.includes('?') ? '&' : '?';
    const parameterString = Object.keys(parameters)
    .map(param => `${param}=${parameters[param]}`)
    .join('&');
    const newUrl = `${url}${separator}${parameterString}`;
    return newUrl
}

module.exports = {addParameter}