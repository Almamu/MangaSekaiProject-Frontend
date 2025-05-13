import { useEffect, useState } from "react";

/**
 * Basic hook that provides an abort controller that will signal
 * when the component is being unmounted
 */
export const useAbortSignal = () => {
  const [abortController] = useState(new AbortController());

  useEffect(() => {
    return () => {
      abortController.abort();
    };
    // disabled because the idea is that this only happens once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return abortController.signal;
};
