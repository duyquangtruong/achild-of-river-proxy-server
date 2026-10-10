# Backend task: add per-value `links` to project fields

> This document is for the **backend / proxy server repo** (the service behind `PROXY_ENDPOINT`, currently `https://achild-of-river-proxy-server-ojc6.onrender.com`). The frontend side is already done in `achild-of-river-UI` on branch `feat/project-field-link`.

## Goal

Each project has `projectFields`: a list of credits/info shown as a title/value grid at the bottom of the project detail page. A field can have several values in `content`. We want **each value to be able to link to its own URL**, for example each designer linking to their portfolio.

To do that, add an optional `links: string[]` to each project field, store it, and return it from the project detail API.

## Current state (checked against the live API)

`GET /api/projects/name/:nameId` returns `{ current, previous, next }`. `current` is the full project document. It includes `__v`, so the backend uses Mongoose. Today a project field looks like this:

```json
{ "title": "DESIGNERS", "content": ["Buun Ngo", "Hung Le"] }
```

Some projects have `"projectFields": []`.

## New data contract

| Property  | Type       | Required | Notes                                           |
| --------- | ---------- | -------- | ----------------------------------------------- |
| `title`   | `string`   | yes      | Unchanged                                       |
| `content` | `string[]` | yes      | Unchanged                                       |
| `links`   | `string[]` | **no**   | **New.** `links[i]` is the URL for `content[i]` |

Rules:

1. `links` lines up with `content` **by index**: `links[0]` belongs to `content[0]`, `links[1]` to `content[1]`, and so on.
2. Each non-empty entry is a full URL starting with `http://` or `https://`.
3. An empty string at position `i` means `content[i]` is plain text. Keep it as `""`, **don't remove it**, or every later link shifts onto the wrong value.
4. `links` can be missing (whole field is plain text) or shorter than `content` (values past the end are plain text). It must **not** be longer than `content`.
5. Plain strings only. No HTML in `content` or `links`.

Example:

```json
{
  "title": "DESIGNERS",
  "content": ["Buun Ngo", "Hung Le"],
  "links": ["https://example.com/buun-ngo", ""]
}
```

"Buun Ngo" renders as a link and "Hung Le" stays plain text.

## Implementation steps

### 1. Find the relevant code

Search the repo for:

- the project model/schema: `mongoose.model(`, `Schema(`, `projectFields`
- the detail route: `/api/projects/name`, `nameId`
- any admin/create/update routes for projects: `router.post`, `router.put`, `router.patch`, `findOneAndUpdate`, `updateOne`

### 2. Update the Mongoose schema

Add `links` to the project field definition. If `projectFields` is currently `Array`, `[Object]` or `Mixed`, the field is already stored as-is, but defining it explicitly is clearer.

```js
// Adapt to the existing model.
const ProjectFieldSchema = new Schema({
  title: { type: String, required: true },
  content: { type: [String], default: [] },
  // New: optional, aligned with `content` by index. "" = plain text.
  links: { type: [String], default: undefined },
}, { _id: false });

// in the project schema
projectFields: { type: [ProjectFieldSchema], default: [] },
```

`default: undefined` keeps Mongoose from adding `links: []` to every field. Either way works for the frontend.

### 3. Make sure the detail API returns it

`GET /api/projects/name/:nameId` must include `current.projectFields[].links` unchanged. Check for anything that would drop it:

- a `.select(...)` / projection that lists fields explicitly
- a mapper/DTO that rebuilds `projectFields` with only `title` and `content`
- `.lean()` is fine, it returns the stored document as-is

`previous`, `next` and `GET /api/projects/enabled` don't need to change.

### 4. Validate on write (recommended)

In every route or script that creates or updates projects:

- if `links` is present, it must be an array of strings with `links.length <= content.length`
- trim each entry
- each entry must be `""` or match `/^https?:\/\//i`; reject (400) otherwise
- never filter out empty entries (see rule 3)

The frontend also ignores non-http(s) values, so this is defense in depth, not a blocker.

### 5. Admin / CMS (if there is one)

Add an optional URL input next to **each value** of a project field. Build `links` in the same order as `content` on save. When a value is reordered or removed, move or remove its link with it.

## Migration

None. Existing documents without `links` keep working, and the frontend renders them as plain text.

## Acceptance criteria

- [ ] Schema accepts `projectFields[].links` as an optional string array.
- [ ] Adding `links` to a field (directly in MongoDB or through the admin) survives a save/update round trip, with empty entries and order kept.
- [ ] `curl "$PROXY_ENDPOINT/api/projects/name/<nameId>"` shows `links` under `current.projectFields`.
- [ ] Projects without `links` return exactly the same response as before.
- [ ] (If validation added) `links` longer than `content`, or an entry like `javascript:alert(1)` / `www.example.com`, is rejected.
- [ ] End to end: with the frontend branch deployed, each value that has a URL is clickable and opens in a new tab, on desktop and mobile; other values stay plain text.

## Quick manual test

Pick a project, e.g. `Luxe`, and in MongoDB set its `DESIGNERS` field to:

```json
{
  "title": "DESIGNERS",
  "content": ["Buun Ngo", "Hung Le"],
  "links": ["https://example.com", ""]
}
```

Then:

```bash
curl -s "$PROXY_ENDPOINT/api/projects/name/Luxe" | jq '.current.projectFields'
```

The `DESIGNERS` entry should include the `links` array. Remove the test link afterwards if it shouldn't go live.

## Frontend reference (repo `achild-of-river-UI`, already implemented)

- `src/model/ProjectField.ts`: `{ title: string, content: string[], links?: string[] }`
- `src/common/CommonLogic.ts`: `getSafeLink()` allows only `http(s)` URLs
- `src/app/[projectNameId]/ProjectDetail.tsx`: `renderProjectFieldValue()` wraps `content[i]` in `<a target="_blank" rel="noopener noreferrer">` when `links[i]` is a valid URL
