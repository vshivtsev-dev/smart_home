export function isPrerender(request: Request) {
  return request.headers.get("x-prerender") !== null;
}
