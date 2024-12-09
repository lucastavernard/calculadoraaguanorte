import { useEffect } from 'react';

function useScript(src: string) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);
}

export default useScript;
