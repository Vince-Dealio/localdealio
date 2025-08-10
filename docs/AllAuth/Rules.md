// ✅ Full code for AllAuth/Rules.md — safe to create new file with this content

# Auth Rules (LocalDealio)

Central page for authentication decisions and practices.

---

## AUTH-01 — Magic Link Login Flow
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** Primary auth is email magic link (NextAuth + Resend). Clear UX copy explains the flow.

**The Rule**
- Use NextAuth with Email Provider + Resend for magic links.
- Keep logs free of secrets; never print tokens.
- UX text: tell users to check inbox/spam and click the link.

**How to Verify**
- Users receive magic link at allowed addresses/domains.
- Login sessions persist as expected; no secrets in logs.

---

## AUTH-02 — Clerk vs NextAuth Decision Log
**Status:** Active  
**Last Updated:** 2025-08-10  
**Summary:** We chose NextAuth for control and cost. Clerk was evaluated but not adopted.

**The Rule**
- Continue with NextAuth unless future needs require hosted UI features.
- Revisit if cost/complexity trade-offs change.

**How to Verify**
- Codebase references NextAuth only.
- No lingering Clerk SDKs or webhooks in dependencies/config.
