const cache = require('memory-cache');

function cacheMiddleware(duration) {
  return (req, res, next) => {
    const key = `__express__${req.originalUrl}` || req.url;
    const cachedData = cache.get(key);

    if (cachedData) {
      res.json(cachedData);
      return;
    }

    res.sendResponse = res.json;
    res.json = (body) => {
      cache.put(key, body, duration * 1000);
      res.sendResponse(body);
    };

    next();
  };
}

module.exports = cacheMiddleware;
