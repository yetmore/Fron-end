export const helHttp = () => {
  const custonFetch = (endpoin, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoin, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => custonFetch(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return custonFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return custonFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return custonFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
