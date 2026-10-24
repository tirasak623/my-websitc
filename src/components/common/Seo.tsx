import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** ตั้งค่า document title, meta description และ Open Graph metadata ต่อหน้า */
export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | Snack Factory Review`;
    document.title = fullTitle;

    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");
  }, [title, description]);

  return null;
}
