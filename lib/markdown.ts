import type { DocsJson, NavGroup, Page } from "@/lib/docs";
import { routeForSlug } from "@/lib/docs";
import { DOCS_ORIGIN } from "@/lib/contextual";

export function sourceUrlForSlug(slug: string): string {
  return `${DOCS_ORIGIN}${routeForSlug(slug)}`;
}

export function markdownPathForSlug(slug: string): string {
  return slug === "index" ? "/index.md" : `/${slug}.md`;
}

export function markdownUrlForSlug(slug: string): string {
  return `${DOCS_ORIGIN}${markdownPathForSlug(slug)}`;
}

export function slugFromMarkdownSegments(segments: string[]): string {
  const rawPath = segments.join("/");
  const withoutExtension = rawPath.endsWith(".md")
    ? rawPath.slice(0, -".md".length)
    : rawPath;

  return withoutExtension || "index";
}

export function getPageMarkdown(page: Page): string {
  const body = normalizePageContent(page.content);
  const header = [
    `# ${page.title}`,
    page.description ? `> ${page.description}` : "",
    `Source: ${sourceUrlForSlug(page.slug)}`,
  ].filter(Boolean);

  return `${[...header, body].join("\n\n").trim()}\n`;
}

export function getLlmsTxt(config: DocsJson, navGroups: NavGroup[]): string {
  const lines = [`# ${config.name}`];

  if (config.description) {
    lines.push("", `> ${config.description}`);
  }

  for (const group of navGroups) {
    lines.push("", `## ${group.group}`, "");

    for (const page of group.pages) {
      const description = summarizeDescription(page.description);
      const suffix = description ? `: ${description}` : "";
      lines.push(
        `- [${page.title}](${markdownUrlForSlug(page.slug)})${suffix}`,
      );
    }
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

export function getLlmsFullTxt(config: DocsJson, pages: Page[]): string {
  const intro = [`# ${config.name}`];

  if (config.description) {
    intro.push("", `> ${config.description}`);
  }

  return `${[intro.join("\n"), ...pages.map(getPageMarkdown)]
    .join("\n\n---\n\n")
    .trim()}\n`;
}

function normalizePageContent(content: string): string {
  return content
    .split(/(```[\s\S]*?```)/g)
    .map((part) => (part.startsWith("```") ? part : normalizeMdxPart(part)))
    .join("")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeMdxPart(content: string): string {
  let next = decodeMdxStringExpressions(content);

  next = next.replace(
    /<Card\b([\s\S]*?)>\s*([\s\S]*?)\s*<\/Card>/g,
    (_, attrs: string, body: string) => {
      const title = getAttribute(attrs, "title") ?? "Related page";
      const href = getAttribute(attrs, "href");
      const bodyText = cleanInlineText(body);
      const label = href
        ? `[${title}](${absoluteDocsUrl(href)})`
        : `**${title}**`;

      return `- ${label}${bodyText ? `: ${bodyText}` : ""}\n`;
    },
  );

  next = next.replace(/<\/?Columns\b[^>]*>/g, "");

  next = next.replace(
    /<(Warning|Note|Info|Tip|Check)>\s*([\s\S]*?)\s*<\/\1>/g,
    (_, variant: string, body: string) => {
      return `> **${variant}:** ${cleanInlineText(body)}\n`;
    },
  );

  next = next.replace(
    /<a\b[^>]*href="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/a>/g,
    (_, href: string, body: string) => {
      return `[${cleanInlineText(body)}](${absoluteDocsUrl(href)})`;
    },
  );

  next = next.replace(
    /<p\b[^>]*>\s*([\s\S]*?)\s*<\/p>/g,
    (_, body: string) => `${cleanInlineText(body)}\n\n`,
  );

  next = next
    .replace(/<\/?div\b[^>]*>/g, "")
    .replace(/<\/?span\b[^>]*>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/?[^>]+>/g, "")
    .replace(/\]\((\/[^)]+)\)/g, (_, href: string) => {
      return `](${absoluteDocsUrl(href)})`;
    });

  return decodeHtmlEntities(next);
}

function cleanInlineText(value: string): string {
  return decodeHtmlEntities(
    decodeMdxStringExpressions(value)
      .replace(/<\/?[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function getAttribute(attrs: string, name: string): string | null {
  const match = new RegExp(`${name}="([^"]+)"`).exec(attrs);
  return match?.[1] ?? null;
}

function absoluteDocsUrl(value: string): string {
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) {
    return value;
  }

  if (value.startsWith("#")) {
    return `${DOCS_ORIGIN}${value}`;
  }

  return `${DOCS_ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
}

function decodeMdxStringExpressions(value: string): string {
  return value.replace(/\{"((?:[^"\\]|\\.)*)"\}/g, (_, encoded: string) => {
    try {
      return JSON.parse(`"${encoded}"`) as string;
    } catch {
      return encoded;
    }
  });
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function summarizeDescription(description: string): string {
  return description.replace(/\s+/g, " ").trim().slice(0, 300);
}
