export const PUBLIC_ROUTES = ["/sign-in", "/sign-up"];

export const ROLES = Object.freeze({
  Admin: "admin",
  User: "user",
});

export const ROLE_LIST = Object.values(ROLES);

export const APP_INFO = Object.freeze({
  Name: "App Name",
  Prefix: "app_name", // this will be used to name the session cookie: app_name.session
});
