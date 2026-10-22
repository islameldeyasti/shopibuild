"use client";

import { useEffect } from "react";

export function HomeCanvas({ html }: { html: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/homepage-boot.js?v=2";
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
