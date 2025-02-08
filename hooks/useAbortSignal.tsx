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
  }, [abortController]);

  return abortController.signal;
};
