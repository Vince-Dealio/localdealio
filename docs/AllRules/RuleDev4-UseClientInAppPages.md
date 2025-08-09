// ✅ Full code for docs/AllRules/RuleDev4-UseClientInAppPages.md
# RuleDev4 — `"use client"` in App Router Pages Using Hooks

**Why:**  
In the Next.js App Router, files in `src/app/` are **Server Components by default**.  
If you use React hooks (`useState`, `useEffect`, `useRouter`, etc.) or browser-only APIs, you **must** mark the file as a **Client Component** by placing `"use client"` at the very top of the file. Otherwise, Vercel/Next.js builds will fail.

**Rule:**  
When a component under `src/app/` uses React hooks or browser-only APIs, add `"use client"` as the **first line**.

**Good**
    
    // ✅ Full code for src/app/page.tsx
    "use client";
    
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    // ...

**Bad**
    
    // ❌ Missing "use client"
    import { useState } from "react";
    import { useRouter } from "next/navigation";
    // ...

**Notes:**
- Only add `"use client"` when you actually need client behavior (hooks, event handlers, `window`, etc.).
- Prefer keeping most components server-side for performance; push the smallest possible piece to the client.
