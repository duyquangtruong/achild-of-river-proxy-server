# Add optional `link` to project fields

## Context

The frontend (`achild-of-river-UI`) shows each project's `projectFields` as a title/value grid at the bottom of the project detail page. We want a field to be able to link somewhere, for example a "Website" field pointing to the client's site.

The frontend change is already done. If a field has a valid `link`, each of its value lines renders as an `<a>` that opens in a new tab. If it doesn't, the field renders as plain text, the same as today.

This document covers the backend side: storing `link` and returning it from the API.

## Data contract

Each entry in a project's `projectFields` array gets one new **optional** property:

| Property  | Type       | Required | Notes                                         |
|-----------|------------|----------|-----------------------------------------------|
| `title`   | `string`   | yes      | Existing, unchanged                           |
| `content` | `string[]` | yes      | Existing, unchanged                           |
| `link`    | `string`   | **no**   | **New.** Full URL starting with `http://` or `https://` |

Rules:
- One link per field. If `content` has several lines, all of them link to the same URL.
- A missing, `null` or empty `link` means plain text.
- Don't store HTML in `content` or `link`. The frontend renders values as text, so tags would show up literally.

Example project document (only the relevant part):

```json
{
  "nameId": "Buk",
  "name": "ahalfprice–BÜK",
  "projectFields": [
    { "title": "Client", "content": ["ahalfprice"] },
    { "title": "Website", "content": ["ahalfprice.com"], "link": "https://ahalfprice.com" }
  ]
}
```

## Endpoint affected

`GET /api/projects/name/:nameId` returns `{ previous, current, next }`. The frontend reads `current.projectFields[].link`.

`GET /api/projects/enabled` (the index list) is **not** affected and doesn't need to return `projectFields`.

## Changes

### 1. Schema / model
If the project model defines `projectFields` with a schema (for example Mongoose), add `link` to the field sub-schema. Otherwise saves may silently drop it.

```js
// Example for Mongoose. Adapt to the actual model.
const ProjectFieldSchema = new Schema({
  title: { type: String, required: true },
  content: { type: [String], default: [] },
  link: { type: String, trim: true }, // new, optional
}, { _id: false });
```

If the collection is schemaless and documents are edited directly in the database, no model change is needed.

### 2. API response
Check that `GET /api/projects/name/:nameId` returns `current.projectFields[].link`. Look for anything that would strip it:
- a `.select(...)` / projection that lists fields explicitly
- a DTO, serializer or mapper that rebuilds `projectFields` with only `title` and `content`
- response validation or whitelisting

### 3. Validation on write (recommended)
Wherever project fields are created or updated (admin endpoint, CMS, seed script):
- accept `link` only if it is empty or matches `^https?://`
- trim whitespace
- store an empty value as missing (or `""`). The frontend treats both as no link.

The frontend also ignores anything that isn't `http(s)`, so this is defense in depth, not a hard requirement.

### 4. Admin / CMS input (if there is one)
Add an optional "Link" input next to each project field's title/content inputs.

## Migration

None needed. Existing documents without `link` keep working unchanged.

## Testing checklist

- [ ] Add `link` to one field of one test project (e.g. a "Website" field).
- [ ] `curl <PROXY_ENDPOINT>/api/projects/name/<nameId>` shows `link` under `current.projectFields`.
- [ ] Saving or updating that project through the backend keeps `link`.
- [ ] Projects without `link` return the same response as before.
- [ ] On the site, the field's value is clickable and opens the URL in a new tab, on desktop and on mobile (below 1024px).
- [ ] A non-http value (e.g. `javascript:alert(1)` or `www.example.com`) is rejected by validation, or at least renders as plain text.

## Frontend reference (already implemented, for context)

- `src/model/ProjectField.ts`: `{ title: string, content: string[], link?: string }`
- `src/common/CommonLogic.ts`: `getSafeLink()` allows only `http(s)` URLs
- `src/app/[projectNameId]/ProjectDetail.tsx`: `renderProjectFieldValue()` wraps values in `<a target="_blank" rel="noopener noreferrer">` when the link is valid
