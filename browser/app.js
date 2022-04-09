"use strict";
const BASE_URL = location.origin + "/api";

async function fetchAll() {
  try {
    const data = await Promise.all([
      fetch(BASE_URL + "/albums.json").then((res) => res.json()),
      fetch(BASE_URL + "/comments.json").then((res) => res.json()),
      fetch(BASE_URL + "/photos.json").then((res) => res.json()),
      fetch(BASE_URL + "/posts.json").then((res) => res.json()),
      fetch(BASE_URL + "/users.json").then((res) => res.json()),
    ]);
    console.log(data.flat());
    return data.flat().length;
  } catch {
    throw Error("Promise failed");
  }
}

function onClick() {
  console.time("fetch1");
  fetchAll()
    .then(console.log)
    .catch(console.error)
    .finally(() => console.timeEnd("fetch1"));
  console.time("fetch2");
  fetchAll()
    .then(console.log)
    .catch(console.error)
    .finally(() => console.timeEnd("fetch2"));
}

document.querySelector("#btn").addEventListener("click", onClick);
