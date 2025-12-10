const apiVersionMiddleware = (req, res, next) => {
    let version = 'v1'; // Default version

    if (req.headers['x-api-version']) {
        version = req.headers['x-api-version'];
    }

    if (req.user?.apiVersion) {
        version = req.user.apiVersion;
    }

    res.locals.apiVersion = version;
    next();
};

module.exports = apiVersionMiddleware;