import moment from "moment";

const SCOPES = "https://www.googleapis.com/auth/calendar";
const config = {
  clientId:
    "159745962540-f7ntq4ugbn8n213g0s4glcqo4cu3isav.apps.googleusercontent.com",
  project_id: "quickstart-1615809210405",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: "DBSTGgFG_QldpJ46RC7L50v8",
  javascript_origins: [window.location.origin],
  apiKey: "AIzaSyCJa7r1Y6uTAhtszsXJeGxzwPJEvB71fco",
};
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

export const getApi = () => window.gapi;

export function loadApi(apiLoaded) {
  const script = document.createElement("script");
  script.id = "gapi";
  script.src = "https://apis.google.com/js/api.js";
  if (!document.getElementById("gapi")) {
    document.body.appendChild(script);

    script.onload = () => {
      const gapi = getApi();
      gapi.load("client:auth2", () => initClient(apiLoaded));
    };
  } else if (getApi() && getApi().auth2) apiLoaded();
}

function initClient(apiLoaded) {
  const { clientId, apiKey } = config;
  const gapi = getApi();
  gapi.client
    .init({
      apiKey,
      clientId,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(() => gapi.client.load("calendar", "v3", () => apiLoaded()))
    .catch((err) => console.log(err));
}

export async function login() {
  const api = getApi();
  const googleAuth = api.auth2.getAuthInstance();
  return await googleAuth.signIn();
}

export async function getCalendar() {
  const api = getApi();
  // Eventos para el proximo mes
  const nextMonth = moment().add(1, "month");

  const timeMin = nextMonth.startOf("month").toISOString();
  const events = await api.client.calendar.events.list({
    calendarId: "primary",
    timeMin,
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: "startTime",
  });
  return events.result.items;
}

export async function cancelEvent(eventId) {
  const api = getApi();
  return await api.client.calendar.events.delete({
    calendarId: "primary",
    eventId,
  });
}
