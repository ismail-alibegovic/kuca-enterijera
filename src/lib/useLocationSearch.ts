"use client";

import { useSyncExternalStore } from "react";

const EVENT = "ke:urlchange";

function subscribe(cb: () => void) {
  window.addEventListener("popstate", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("popstate", cb);
    window.removeEventListener(EVENT, cb);
  };
}

/** The current `location.search`, as an external store. Empty during prerender, so pages stay static. */
export function useLocationSearch() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => "",
  );
}

/** Replace query parameters without navigation and notify subscribers. */
export function replaceSearch(params: URLSearchParams) {
  const qs = params.toString();
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  window.dispatchEvent(new Event(EVENT));
}
