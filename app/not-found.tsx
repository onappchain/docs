import Link from "next/link";

import { DocsShell } from "@/components/docs-shell";
import { getNavGroups } from "@/lib/docs";

const notFoundPage = {
  slug: "404",
  route: "/404",
  filePath: "",
  title: "Page not found",
  sidebarTitle: "Page not found",
  description: "The page you are looking for does not exist in the Mint docs.",
};

export default function NotFound() {
  return (
    <DocsShell
      currentGroup="Mint docs"
      currentPage={notFoundPage}
      headings={[]}
      navGroups={getNavGroups()}
      nextPage={null}
      pageMarkdown={`# ${notFoundPage.title}\n\n> ${notFoundPage.description}\n\nSource: https://docs.mint.gg/404\n\nCheck the navigation or return to the Mint user guide overview.\n`}
      previousPage={null}
    >
      <p>
        Check the navigation or return to the{" "}
        <Link href="/">Mint user guide overview</Link>.
      </p>
    </DocsShell>
  );
}
