// ✅ Full code for src/app/dev/rules/[file]/page.tsx
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ file: string }> };

const DOCS_DIR = path.join(process.cwd(), "docs", "AllRules");

export default async function RuleFilePage({ params }: Props) {
  const { file } = await params;

  if (!file.endsWith(".md")) return notFound();

  const filePath = path.join(DOCS_DIR, file);

  let md: string;
  try {
    md = await fs.readFile(filePath, "utf8");
  } catch {
    return notFound();
  }

  // Keep in-app navigation working for relative links inside the doc
  const adjusted = md.replace(/\(([^)]+\.md)\)/g, "(/dev/rules/$1)");
  const html = marked.parse(adjusted);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold break-all">{file}</h1>
        <nav className="flex gap-4">
          <Link href="/dev/rules" className="underline">
            All Rules
          </Link>
          <Link href="/" className="underline">
            Home
          </Link>
        </nav>
      </div>

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html as string }}
      />
    </main>
  );
}
