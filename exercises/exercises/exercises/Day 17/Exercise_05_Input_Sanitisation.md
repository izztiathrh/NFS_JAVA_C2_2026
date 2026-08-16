# D17 Exercise 05 — Input Sanitisation

## Goal

Explain and apply simple input sanitisation.

## Tasks

Create a small utility or helper method that can:

1. Trim leading/trailing spaces.
2. Convert empty strings to null where appropriate.
3. Remove control characters from simple text.
4. Normalise code-like fields if needed.

## Important

Do not use sanitisation to hide invalid input. Some input should still be rejected.

## Submission

Implemented `InputSanitizer` (`com.example.AssetTracker.util.InputSanitizer`) with:

- `trimToNull(String)` — trims whitespace, converts a blank result to `null`.
- `cleanText(String)` — trims and escapes `<`/`>` to `&lt;`/`&gt;` so HTML/script tags can never render.
- `removeControlCharacters(String)` — strips control characters (tabs, newlines, null bytes) from single-line text.
- `normaliseCode(String)` — trims and uppercases code-like fields (e.g. serial numbers), so `" sn-lap-a1b2c3d4 "` and `"SN-LAP-A1B2C3D4"` normalise to the same value.
- `isValidSerialNumber(String)` — a **validation** method, not sanitisation: returns `false` for blank input instead of silently accepting or fixing it, so callers still reject invalid data.

## Reflection

Answer:

1. **What is validation?**
   Validation decides whether an input is *allowed at all*. It checks input against rules (required fields, length, format, allowed characters) and rejects the request if it fails — it never changes the data, it only accepts or rejects it. Example in this codebase: `@Valid` on `CreateTicketRequest` in `TicketController`, which returns `400 Bad Request` when `title`/`description`/`priority`/`category` are missing.

2. **What is sanitisation?**
   Sanitisation *cleans* an input so it's safe and consistent, without changing its meaning — trimming stray whitespace, normalising case, stripping control characters, escaping characters that could be interpreted as HTML/script. It runs before or alongside validation, but it is not a substitute for it.

3. **One example where input should be cleaned:**
   A serial number typed as `" sn-lap-a1b2c3d4 "` with extra spaces and lowercase letters. It's still a valid, meaningful serial number — just inconsistently formatted — so it's safe to trim and uppercase it to `"SN-LAP-A1B2C3D4"` before storing/comparing it.

4. **One example where input should be rejected:**
   An empty/blank serial number, e.g. `""` or `"   "`. There's nothing to clean here — a blank value is genuinely invalid business data (an asset must have a serial number), so it must be rejected with a validation error, not silently filled in with a placeholder or accepted as-is. This is exactly why `isValidSerialNumber()` is a separate rejecting check rather than something `trimToNull` quietly papers over.

