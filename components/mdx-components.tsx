import type { AnchorHTMLAttributes, CSSProperties, PropsWithChildren } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Compass,
  Info as InfoIcon,
  Lightbulb,
  LucideIcon,
  MessageSquare,
  Rocket,
  Settings2,
  User,
  Wallet,
  WandSparkles,
} from "lucide-react";

import { slugify, textFromNode } from "@/lib/slug";

const cardIcons: Record<string, LucideIcon> = {
  camera: Camera,
  compass: Compass,
  "circle-help": CircleHelp,
  "message-square": MessageSquare,
  rocket: Rocket,
  "settings-2": Settings2,
  user: User,
  wallet: Wallet,
  "wand-sparkles": WandSparkles,
};

type ColumnsProps = PropsWithChildren<{
  cols?: number;
}>;

type CardProps = PropsWithChildren<{
  title: string;
  icon?: string;
  href?: string;
}>;

type CalloutProps = PropsWithChildren<{
  variant: "note" | "info" | "tip" | "warning" | "check";
}>;

export function Columns({ children, cols = 2 }: ColumnsProps) {
  return (
    <div
      className="docs-columns"
      style={{ "--docs-columns": cols } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Card({ title, icon, href, children }: CardProps) {
  const Icon = icon ? cardIcons[icon] ?? InfoIcon : InfoIcon;
  const body = (
    <>
      <span className="docs-card-icon" aria-hidden="true">
        <Icon size={20} strokeWidth={2.1} />
      </span>
      <span className="docs-card-copy">
        <strong>{title}</strong>
        <span>{children}</span>
      </span>
      <ChevronRight className="docs-card-arrow" size={18} aria-hidden="true" />
    </>
  );

  if (!href) {
    return <div className="docs-card">{body}</div>;
  }

  return (
    <Link className="docs-card" href={href}>
      {body}
    </Link>
  );
}

export function Warning({ children }: PropsWithChildren) {
  return <Callout variant="warning">{children}</Callout>;
}

export function Note({ children }: PropsWithChildren) {
  return <Callout variant="note">{children}</Callout>;
}

export function Info({ children }: PropsWithChildren) {
  return <Callout variant="info">{children}</Callout>;
}

export function Tip({ children }: PropsWithChildren) {
  return <Callout variant="tip">{children}</Callout>;
}

export function Check({ children }: PropsWithChildren) {
  return <Callout variant="check">{children}</Callout>;
}

function Callout({ variant, children }: CalloutProps) {
  const icons: Record<CalloutProps["variant"], LucideIcon> = {
    check: CheckCircle2,
    info: InfoIcon,
    note: InfoIcon,
    tip: Lightbulb,
    warning: AlertTriangle,
  };
  const Icon = icons[variant];

  return (
    <aside className={`docs-callout docs-callout-${variant}`}>
      <Icon size={20} aria-hidden="true" />
      <div>{children}</div>
    </aside>
  );
}

function DocsLink({
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  );
}

function H2({ children }: PropsWithChildren) {
  const id = slugify(textFromNode(children));

  return <h2 id={id}>{children}</h2>;
}

function H3({ children }: PropsWithChildren) {
  const id = slugify(textFromNode(children));

  return <h3 id={id}>{children}</h3>;
}

export const mdxComponents = {
  a: DocsLink,
  Card,
  Check,
  Columns,
  Info,
  Note,
  Tip,
  Warning,
  h2: H2,
  h3: H3,
};
