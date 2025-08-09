RuleDev2 — Prisma: No Unused @ts-expect-error
Why:
Vercel fails builds when @ts-expect-error is present without an actual TypeScript error.

Rule:
If the Prisma model exists (e.g., pendingUser), remove @ts-expect-error and type the call properly.

Example (GOOD)
ts
Copy
Edit
const pending = await prisma.pendingUser.findFirst({
  where: { username: raw },
  select: { id: true },
});
Example (BAD)
ts
Copy
Edit
// @ts-expect-error PendingUser may not exist
const pending = await prisma.pendingUser.findFirst(...)