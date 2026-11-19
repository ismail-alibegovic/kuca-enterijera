import { Children, cloneElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";

/**
 * Server-side word split for staggered headings. Renders:
 *  - an unsplit copy for assistive technology (`sr-only`), and
 *  - a visual copy (`aria-hidden`) in which every word is wrapped in `.w > .wi`.
 * Inline markup (italic spans, line spans) is preserved; links and controls are never split, the heading
 * then renders unchanged. Without JavaScript the visual copy is ordinary inline text.
 */
export function Split({ children, mask = true }: { children: ReactNode; mask?: boolean }) {
  if (hasInteractive(children)) return <>{children}</>;
  const label = textOf(children).replace(/\s+/g, " ").trim();
  let n = 0;
  const split = (node: ReactNode): ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node)
        .split(/(\s+)/)
        .map((part) => {
          if (!part) return null;
          if (/^\s+$/.test(part)) return part;
          const key = n++;
          return (
            <span key={key} className={mask ? "w w-mask" : "w"}>
              <span className="wi">{part}</span>
            </span>
          );
        });
    }
    if (Array.isArray(node)) return node.map((c, i) => <Fragment key={i}>{split(c)}</Fragment>);
    if (isValidElement<{ children?: ReactNode }>(node)) {
      return cloneElement(node, undefined, split(node.props.children));
    }
    return node;
  };
  return (
    <>
      <span className="split-visual" aria-hidden="true">
        {split(children)}
      </span>
      <span className="sr-only">{label}</span>
    </>
  );
}

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    // Block-level line spans read as separate lines; keep a space between them.
    return textOf(node.props.children) + " ";
  }
  return "";
}

function hasInteractive(node: ReactNode): boolean {
  let found = false;
  Children.forEach(node, (c) => {
    if (found || !isValidElement<{ children?: ReactNode; href?: string }>(c)) return;
    const el = c as ReactElement<{ children?: ReactNode; href?: string }>;
    if (typeof el.type === "string" ? ["a", "button", "input", "select", "textarea"].includes(el.type) : el.props.href) found = true;
    else found = hasInteractive(el.props.children);
  });
  return found;
}
