import { default as axios } from "axios";

const CLIENT_ID = "0ee7762550d97da8c45f";
const CLIENT_SECRECT = "0ac19329427795b382ad48544e396aa38b0726b1";
const GITHUB_WEBHOOK = "https://github.com/login/oauth/authorize";
const GITHUB_ACCESS_TOKEN_WEBHOOK =
  "https://github.com/login/oauth/access_token";
const WEBHOOK = "http://localhost:8001";
const API = "https://api.github.com";

export function initOAuth() {
  window.location.replace(`${GITHUB_WEBHOOK}/?client_id=${CLIENT_ID}`);
}

export async function accessToken(code) {
  return await axios.post(WEBHOOK + "/auth", {
    url: GITHUB_ACCESS_TOKEN_WEBHOOK,
    id: CLIENT_ID,
    secret: CLIENT_SECRECT,
    code,
  });
}

export async function getUser(token) {
  return (
    await axios.get(API + "/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}

export async function getRepos(token, url) {
  return (
    await axios.get(url + "/repos", {
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;
}
