const localHost =
  "https://7528-102-67-6-100.ngrok.io/fireapp-8b41a/us-central1";
const liveHost = "https://us-central1-fireapp-8b41a.cloudfunctions.net";

const isDevelopment = process.env.NODE_ENV === "development";

export const host = isDevelopment ? localHost : liveHost;
