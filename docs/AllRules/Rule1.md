// ✅ Full code for docs/AllRules/Rule1.md
# Rule1 — Full File Replacements + Git Commands

When updating any file in the digi.site project:

1. **Always** provide the **full content** of the file being updated, starting with:

// ✅ Full code for relative/path/to/file


This ensures the file can be safely deleted and replaced without missing code.

2. **Always** include the **full Git commands** to stage, commit, and push the change.
- If the dev server must be stopped before running commands (e.g., for Prisma schema changes), explicitly say so.
- Git commands must include the **full relative path** to the file.

3. **Never** send partial snippets for file updates — the entire file must be sent.

---

## Cross-references
When applying Rule1 to specific file types:

- **API or server code** — Also follow **[RuleDev2-PrismaNoUnusedTsExpect](./RuleDev2-PrismaNoUnusedTsExpect.md)** to avoid unused `@ts-expect-error` directives in Prisma queries.
- **JSX/TSX files with `<input>` elements** — Also follow **[RuleDev3-TSInputMode](./RuleDev3-TSInputMode.md)** to ensure only valid `inputMode` values are used (`none | text | tel | url | email | numeric | decimal | search`).

---

## Example

**Request:**
> Please update `/src/app/page.tsx` to change the homepage hero text.

**Response:**
```tsx
// ✅ Full code for src/app/page.tsx
export default function HomePage() {
return <h1>New Hero Text</h1>;
}
