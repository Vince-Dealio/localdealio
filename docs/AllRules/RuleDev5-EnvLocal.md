# RuleDev5-EnvLocal

In Next.js projects, always use `.env.local` for environment variables during development and `.env` ONLY for default/fallback values.  
Never put sensitive production credentials directly in `.env`.  

Reason:  
- `.env.local` is ignored by Git by default → prevents accidental commits of secrets.  
- Vercel’s environment variables will override these in Production automatically.  

Usage:  
- Store all local development keys/secrets in `.env.local`  
- Keep `.env` for non-sensitive defaults or placeholder values.
