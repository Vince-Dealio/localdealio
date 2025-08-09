# RuleDev6-NoPackageJsonComments

Never include comment lines (// or /* ... */) in `package.json`.  

Reason:  
- `package.json` must be valid JSON. JSON does not support comments.
- Even a single comment will break `npm install`, `npm run build`, and Vercel deployments.

If a note is required, store it in a README file, in /docs/AllRules, or above the relevant script in a separate Markdown file.
