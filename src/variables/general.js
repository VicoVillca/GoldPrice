var URL_BACK_END = process.env.REACT_APP_URL_BACK_END;
module.exports = {
  URL_BACK_END,
  header,
  headerPublic,
};
function header($token) {
  return {
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      auth: $token,
    },
  };
}
function headerPublic() {
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
      origin: "x-requested-with",
      "Access-Control-Allow-Headers":
        "POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin",
      "Content-Type": "application/json",
    },
  };
}