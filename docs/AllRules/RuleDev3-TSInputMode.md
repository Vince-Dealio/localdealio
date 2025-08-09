RuleDev3 — TypeScript: Valid inputMode Only
Allowed values:
none | text | tel | url | email | numeric | decimal | search

Rule:
Do not use unsupported values (e.g., "latin").
For username inputs, use inputMode="text" or omit the attribute.

Example (GOOD)
tsx
Copy
Edit
<input inputMode="text" />
Example (BAD)
tsx
Copy
Edit
<input inputMode="latin" />