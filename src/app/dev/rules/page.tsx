// ✅ Full code for src/app/dev/rules/page.tsx
import fs from "fs/promises";
import path from "path";
import { marked } from "marked";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DOCS_DIR = path.join(process.cwd(), "docs", "AllRules");

async function getReadmeHtml() {
  const readmePath = path.join(DOCS_DIR, "README.md");
  const md = await fs.readFile(readmePath, "utf8");

  // Rewrite relative links like (Rule1.md) → (/dev/rules/Rule1.md)
  const adjusted = md.replace(/\(([^)]+\.md)\)/g, "(/dev/rules/$1)");
  return marked.parse(adjusted);
}

async function listRuleFiles() {
  const items = await fs.readdir(DOCS_DIR, { withFileTypes: true });
  const mdFiles = items
    .filter((d) => d.isFile() && d.name.endsWith(".md") && d.name !== "README.md")
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b)); // stable order
  return mdFiles;
}

export default async function RulesIndexPage() {
  const [html, files] = await Promise.all([getReadmeHtml(), listRuleFiles()]);

  return (
    <main className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">digi.site — Dev Rules</h1>
        <Link href="/" className="underline">
          ← Back to site
        </Link>
      </div>

      {/* Render README.md */}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html as string }}
      />

      {/* Auto-generated file list */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">All Rule Files</h2>
        <ul className="list-disc pl-6">
          {files.map((name) => (
            <li key={name}>
              <Link href={`/dev/rules/${encodeURIComponent(name)}`} className="underline">
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
