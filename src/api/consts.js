export const baseUri =
  process.env.NODE_ENV === "production"
    ? "https://sleepy-waters-11578.herokuapp.com/"
    : "http:localhost:4000";
