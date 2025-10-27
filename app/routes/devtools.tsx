import type { Route } from "./+types/devtools";

export function loader() {
  // Return a simple JSON response for Chrome DevTools
  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function DevTools() {
  // This component should never render as we handle the response in the loader
  return null;
}
