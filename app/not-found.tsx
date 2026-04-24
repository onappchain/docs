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
      previousPage={null}
    >
      <p>
        Check the navigation or return to the{" "}
        <Link href="/">Mint user guide overview</Link>.
      </p>
    </DocsShell>
  );
}
