import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", 'routes/auth.tsx'),
  route("/upload", 'routes/upload.tsx'),
  route("/resume/:id", 'routes/resume.tsx'),
  route("/wipe", 'routes/wipe.tsx'),
  // Handle Chrome DevTools requests
  route("/.well-known/appspecific/com.chrome.devtools.json", "routes/devtools.tsx"),
] satisfies RouteConfig;
