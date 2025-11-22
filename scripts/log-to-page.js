// scripts/log-to-page.js
// import { highlightPreBlocks } from "./shiki-pre.js";

const formatHTML = (el, depth = 0) => {
  const indent = "  ".repeat(depth);
  const children = Array.from(el.children);
  if (!children.length) return `${indent}${el.outerHTML}`;
  const openTag = `${indent}<${el.tagName.toLowerCase()}>`;
  const inner = children.map((c) => formatHTML(c, depth + 1)).join("\n");
  const closeTag = `${indent}</${el.tagName.toLowerCase()}>`;
  return `${openTag}\n${inner}\n${closeTag}`;
};

const formatValue = (val, depth = 0, seen = new WeakSet()) => {
  const indent = "  ".repeat(depth);

  if (val === null) return "null";
  if (typeof val === "undefined") return "undefined";
  if (typeof val === "string") return `"${val}"`;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (typeof val === "function") return `[Function ${val.name || "anonymous"}]`;
  if (typeof val !== "object") return String(val);

  if (seen.has(val)) return "[Circular]";
  seen.add(val);

  if (val instanceof Element) return formatHTML(val, depth);

  if (val instanceof NodeList || val instanceof HTMLCollection) {
    const arr = Array.from(val);
    if (arr.length === 0) return "[]";
    const items = arr.map(
      (v) => indent + "  " + formatValue(v, depth + 1, seen)
    );
    return "[\n" + items.join(",\n") + "\n" + indent + "]";
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return "[]";
    const items = val.map(
      (v) => indent + "  " + formatValue(v, depth + 1, seen)
    );
    return "[\n" + items.join(",\n") + "\n" + indent + "]";
  }

  const keys = Object.keys(val);
  if (keys.length === 0) return "{}";

  const entries = keys.map(
    (k) => indent + "  " + k + ": " + formatValue(val[k], depth + 1, seen)
  );
  return "{\n" + entries.join(",\n") + "\n" + indent + "}";
};

// ---------------------------------------------------------------------------
// Вырезка языка из первой непустой строки переданной на вывод в console.log
// ---------------------------------------------------------------------------
const extractLanguage = (text) => {
  if (typeof text !== "string") return { lang: null, content: text };

  const lines = text.split("\n");

  // Первая непустая строка
  const idx = lines.findIndex((l) => l.trim() !== "");
  if (idx === -1) return { lang: null, content: text };

  const first = lines[idx].trim();
  const parts = first.split(" ");

  if (parts[0] !== "//" || parts.length < 2) {
    return { lang: null, content: text };
  }

  const lang = parts[1];
  const rest = parts.slice(2).join(" ");

  const contentLines = [...lines];
  contentLines[idx] = rest;

  return {
    lang,
    content: contentLines.join("\n"),
  };
};

// ---------------------------------------------------------------------------
// Вывод в <pre> с учётом языка
// ---------------------------------------------------------------------------
const output = (type, ...args) => {
  const pre = document.createElement("pre");

  pre.style.color =
    type === "error" ? "red" : type === "warn" ? "orange" : "var(--color-text)";

  let lang = null;

  const processed = args.map((a) => {
    if (typeof a === "string") {
      const r = extractLanguage(a);
      if (r.lang) lang = r.lang;
      return r.content;
    }
    if (typeof a === "object") return formatValue(a);
    return String(a);
  });

  pre.textContent = processed.join("\n");

  if (lang) pre.classList.add(`language-${lang}`);

  document.getElementById("console").appendChild(pre);

  // highlightPreBlocks(
  //   localStorage.getItem("theme") === "dark" ? "rose-pine" : "rose-pine-dawn"
  // );
};

// ---------------------------------------------------------------------------
// Перехват console
// ---------------------------------------------------------------------------
const origLog = console.log;
const origWarn = console.warn;
const origErr = console.error;

console.log = (...args) => {
  origLog(...args);
  output("log", ...args);
};
console.warn = (...args) => {
  origWarn(...args);
  output("warn", ...args);
};
console.error = (...args) => {
  origErr(...args);
  output("error", ...args);
};

// ---------------------------------------------------------------------------
// Ошибки
// ---------------------------------------------------------------------------
window.onerror = (msg, src, line, col, err) => {
  output("error", `Ошибка: ${msg} (${src}:${line}:${col})`);
};

window.onunhandledrejection = (e) => {
  output("error", "Unhandled promise rejection:", e.reason);
};

// Пример теста
// const div = document.createElement("div");
// div.innerHTML = `<input type="text" value="A"><input type="text" value="B">`;
// document.body.appendChild(div);
// console.log({ inputs: div.querySelectorAll("input") });
