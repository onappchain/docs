import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { slugify } from "@/lib/slug";

export type Heading = {
  id: string;
  title: string;
  level: 2 | 3;
};

export type PageMeta = {
  slug: string;
  route: string;
  filePath: string;
  title: string;
  sidebarTitle: string;
  description: string;
  mode?: string;
};

export type Page = PageMeta & {
  content: string;
  headings: Heading[];
};

export type NavGroup = {
  group: string;
  pages: PageMeta[];
};

type DocsJson = {
  name: string;
  description?: string;
  navigation?: {
    groups?: Array<{
      group: string;
      pages: string[];
    }>;
  };
};

type Frontmatter = {
  title?: string;
  sidebarTitle?: string;
  description?: string;
  mode?: string;
};

export function routeForSlug(slug: string): string {
  return slug === "index" ? "/" : `/${slug}`;
}

export function slugFromSegments(segments?: string[]): string {
  return !segments || segments.length === 0 ? "index" : segments.join("/");
}

export function getDocsConfig(): DocsJson {
  const configPath = resolveProjectFile("docs.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8")) as DocsJson;
}

export function getPageMeta(slug: string): PageMeta | null {
  const filePath = resolveProjectFile(`${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const frontmatter = data as Frontmatter;
  const title = frontmatter.title ?? titleFromSlug(slug);

  return {
    slug,
    route: routeForSlug(slug),
    filePath,
    title,
    sidebarTitle: frontmatter.sidebarTitle ?? title,
    description: frontmatter.description ?? "",
    mode: frontmatter.mode,
  };
}

export function getPage(slug: string): Page | null {
  const meta = getPageMeta(slug);

  if (!meta) {
    return null;
  }

  const raw = fs.readFileSync(meta.filePath, "utf8");
  const { content } = matter(raw);

  return {
    ...meta,
    content,
    headings: extractHeadings(content),
  };
}

export function getNavGroups(): NavGroup[] {
  const config = getDocsConfig();

  return (config.navigation?.groups ?? []).map((group) => ({
    group: group.group,
    pages: group.pages
      .map((slug) => getPageMeta(slug))
      .filter((page): page is PageMeta => page !== null),
  }));
}

export function getAllPageMeta(): PageMeta[] {
  return getNavGroups().flatMap((group) => group.pages);
}

export function getAdjacentPages(currentSlug: string): {
  previous: PageMeta | null;
  next: PageMeta | null;
} {
  const pages = getAllPageMeta();
  const currentIndex = pages.findIndex((page) => page.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: pages[currentIndex - 1] ?? null,
    next: pages[currentIndex + 1] ?? null,
  };
}

export function getGroupForPage(slug: string): string | null {
  for (const group of getNavGroups()) {
    if (group.pages.some((page) => page.slug === slug)) {
      return group.group;
    }
  }

  return null;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (line.trim().startsWith("```")) {
      inFence = !inFence;
      continue;
    }

    if (inFence) {
      continue;
    }

    const match = /^(#{2,3})\s+(.+)$/.exec(line);

    if (!match) {
      continue;
    }

    const title = match[2].replace(/\s+#$/, "").trim();
    headings.push({
      id: slugify(title),
      title,
      level: match[1].length as 2 | 3,
    });
  }

  return headings;
}

function titleFromSlug(slug: string): string {
  return slug
    .split("/")
    .pop()!
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function resolveProjectFile(...segments: string[]): string {
  return path.join(/* turbopackIgnore: true */ process.cwd(), ...segments);
}
