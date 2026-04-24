import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const themeScript = `
(function() {
  var storageKey = "mint_docs_theme";
  var cookieName = "mint_docs_theme";
  var systemQuery = "(prefers-color-scheme: dark)";
  var themeColors = { light: "#F2EDE8", dark: "#1C1C1E" };

  function isThemePreference(value) {
    return value === "system" || value === "light" || value === "dark";
  }

  function getCookiePreference() {
    var match = document.cookie.match(new RegExp("(?:^|; )" + cookieName + "=([^;]*)"));
    var value = match ? decodeURIComponent(match[1]) : null;
    return isThemePreference(value) ? value : null;
  }

  function getPreference() {
    try {
      var stored = window.localStorage.getItem(storageKey);
      if (isThemePreference(stored)) return stored;
    } catch (error) {}
    return getCookiePreference() || "system";
  }

  function getEffectiveTheme(preference) {
    if (preference === "light" || preference === "dark") return preference;
    return window.matchMedia(systemQuery).matches ? "dark" : "light";
  }

  function setThemeColor(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = themeColors[theme];
  }

  var preference = getPreference();
  var theme = getEffectiveTheme(preference);
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.style.colorScheme = theme;
  setThemeColor(theme);
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.mint.gg"),
  title: {
    default: "Mint docs",
    template: "%s | Mint docs",
  },
  description:
    "End-user documentation for exploring, creating, and sharing with Mint.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EDE8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="mint-docs-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        {children}
      </body>
    </html>
  );
}
