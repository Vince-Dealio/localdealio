# RuleDev3-NoCommentsInJSON

## Why
JSON is a strict format — it does **not** support comments (`//` or `/* */`).  
Adding comments will cause parsing errors in tools like Vercel, npm, or Node, leading to failed builds or broken deployments.

## Do
- Keep `package.json`, `tsconfig.json`, and all `.json` files strictly valid JSON.
- Use an external README or `.md` file if you need to explain config choices.

## Don't
- ❌ Add `//` or `/* ... */` comments inside JSON files.
- ❌ Leave trailing commas — they’re also invalid in strict JSON.

## Example — Bad
```json
{
  "name": "digi-site", // This is our project
  "version": "0.1.0",
}
