// OpenAPI spec served by swagger-ui-express at /api-docs (see app.js).
// Keep in sync with routes/*.js when endpoints change.

const errorResponse = (description) => ({
  description,
  content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } },
});

const messageResponse = (description, example) => ({
  description,
  content: {
    "application/json": {
      schema: { $ref: "#/components/schemas/Message" },
      example: { message: example },
    },
  },
});

const jsonBody = (ref, required = true) => ({
  required,
  content: { "application/json": { schema: { $ref: ref } } },
});

const jsonResponse = (description, schema) => ({
  description,
  content: { "application/json": { schema } },
});

const idParam = (name, description) => ({
  name,
  in: "path",
  required: true,
  description,
  schema: { type: "string" },
});

const nameIdParam = idParam("nameId", "Project slug (the `nameId` field)");
const mongoIdParam = idParam("id", "MongoDB ObjectId (`_id`)");

module.exports = {
  openapi: "3.0.3",
  info: {
    title: "A Child of River - Proxy Server API",
    version: "1.0.0",
    description:
      "REST API for projects, intro media and personal page content. " +
      "Update endpoints use MongoDB `$set`: only the fields sent are changed, and arrays are replaced entirely. " +
      "No endpoint supports bulk updates.",
  },
  servers: [{ url: "/", description: "Current server" }],
  tags: [
    { name: "Projects" },
    { name: "Intro Media" },
    { name: "Intro Media Mobile" },
    { name: "Personal" },
  ],
  paths: {
    "/api/projects": {
      get: {
        tags: ["Projects"],
        summary: "List all projects (index view)",
        description: "Returns a lightweight projection of every project, sorted by `index` ascending.",
        responses: {
          200: jsonResponse("Project index list", {
            type: "array",
            items: { $ref: "#/components/schemas/ProjectIndexItem" },
          }),
          500: errorResponse("Server error"),
        },
      },
      post: {
        tags: ["Projects"],
        summary: "Create a project",
        requestBody: jsonBody("#/components/schemas/ProjectInput"),
        responses: {
          201: jsonResponse("Created project", { $ref: "#/components/schemas/Project" }),
          400: errorResponse("Validation error"),
        },
      },
    },
    "/api/projects/enabled": {
      get: {
        tags: ["Projects"],
        summary: "List enabled projects (index view)",
        description: "Same as `GET /api/projects` but only projects with `isEnabled: true`.",
        responses: {
          200: jsonResponse("Enabled project index list", {
            type: "array",
            items: { $ref: "#/components/schemas/ProjectIndexItem" },
          }),
          500: errorResponse("Server error"),
        },
      },
    },
    "/api/projects/name/{nameId}": {
      get: {
        tags: ["Projects"],
        summary: "Get project detail with previous/next navigation",
        description:
          "Returns the full project plus the previous and next projects by `index` (wrapping around at the ends).",
        parameters: [nameIdParam],
        responses: {
          200: jsonResponse("Project detail", { $ref: "#/components/schemas/ProjectDetail" }),
          404: messageResponse("Project not found", "Cannot find project with nameId = my-project "),
          500: errorResponse("Server error"),
        },
      },
    },
    "/api/projects/{nameId}": {
      put: {
        tags: ["Projects"],
        summary: "Update a single project",
        description:
          "Partially updates one project matched by `nameId`. Only the fields sent are changed; arrays are replaced. " +
          "Schema validators are not run on update.",
        parameters: [nameIdParam],
        requestBody: jsonBody("#/components/schemas/ProjectInput"),
        responses: {
          200: jsonResponse("Updated project", { $ref: "#/components/schemas/Project" }),
          400: errorResponse("Invalid update"),
          404: messageResponse("Project not found", "Count not update the Project!"),
        },
      },
      delete: {
        tags: ["Projects"],
        summary: "Delete a project",
        parameters: [nameIdParam],
        responses: {
          200: messageResponse("Deleted", "Project has been deleted"),
          404: messageResponse("Project not found", "Project not found!"),
          500: errorResponse("Server error"),
        },
      },
    },

    "/api/introMedia": {
      get: {
        tags: ["Intro Media"],
        summary: "List desktop intro images",
        description:
          "Reads from the **projects** collection (not IntroMedia): every project with a non-empty `desktopIntroImg`, sorted by `index`.",
        responses: {
          200: jsonResponse("Desktop intro images", {
            type: "array",
            items: { $ref: "#/components/schemas/DesktopIntroItem" },
          }),
          500: errorResponse("Server error"),
        },
      },
      post: {
        tags: ["Intro Media"],
        summary: "Create an IntroMedia document",
        requestBody: jsonBody("#/components/schemas/IntroMediaInput"),
        responses: {
          201: jsonResponse("Created", { $ref: "#/components/schemas/IntroMedia" }),
          400: errorResponse("Validation error"),
        },
      },
    },
    "/api/introMedia/all": {
      get: {
        tags: ["Intro Media"],
        summary: "List desktop and mobile intro images",
        description: "Both lists are read from the projects collection, sorted by `index`.",
        responses: {
          200: jsonResponse("Intro images for both devices", {
            type: "object",
            properties: {
              desktop: { type: "array", items: { $ref: "#/components/schemas/DesktopIntroItem" } },
              mobile: { type: "array", items: { $ref: "#/components/schemas/MobileIntroItem" } },
            },
          }),
          500: errorResponse("Server error"),
        },
      },
    },
    "/api/introMedia/{id}": {
      put: {
        tags: ["Intro Media"],
        summary: "Update an IntroMedia document",
        parameters: [mongoIdParam],
        requestBody: jsonBody("#/components/schemas/IntroMediaInput"),
        responses: {
          200: jsonResponse("Updated", { $ref: "#/components/schemas/IntroMedia" }),
          400: errorResponse("Invalid update or id"),
          404: messageResponse("Not found", "Count not update the IntroMedia!"),
        },
      },
      delete: {
        tags: ["Intro Media"],
        summary: "Delete an IntroMedia document",
        parameters: [mongoIdParam],
        responses: {
          200: messageResponse("Deleted", "IntroMedia has been deleted"),
          404: messageResponse("Not found", "IntroMedia not found!"),
          500: errorResponse("Server error"),
        },
      },
    },

    "/api/introMediaMobile": {
      get: {
        tags: ["Intro Media Mobile"],
        summary: "List IntroMediaMobile documents",
        responses: {
          200: jsonResponse("All IntroMediaMobile documents", {
            type: "array",
            items: { $ref: "#/components/schemas/IntroMedia" },
          }),
          500: errorResponse("Server error"),
        },
      },
      post: {
        tags: ["Intro Media Mobile"],
        summary: "Create an IntroMediaMobile document",
        requestBody: jsonBody("#/components/schemas/IntroMediaInput"),
        responses: {
          201: jsonResponse("Created", { $ref: "#/components/schemas/IntroMedia" }),
          400: errorResponse("Validation error"),
        },
      },
    },
    "/api/introMediaMobile/{id}": {
      put: {
        tags: ["Intro Media Mobile"],
        summary: "Update an IntroMediaMobile document",
        parameters: [mongoIdParam],
        requestBody: jsonBody("#/components/schemas/IntroMediaInput"),
        responses: {
          200: jsonResponse("Updated", { $ref: "#/components/schemas/IntroMedia" }),
          400: errorResponse("Invalid update or id"),
          404: messageResponse("Not found", "Count not update the IntroMediaMobile!"),
        },
      },
      delete: {
        tags: ["Intro Media Mobile"],
        summary: "Delete an IntroMediaMobile document",
        parameters: [mongoIdParam],
        responses: {
          200: messageResponse("Deleted", "IntroMediaMobile has been deleted"),
          404: messageResponse("Not found", "IntroMediaMobile not found!"),
          500: errorResponse("Server error"),
        },
      },
    },

    "/api/personal": {
      get: {
        tags: ["Personal"],
        summary: "Get personal page content",
        description: "Returns the first (single) Personal document.",
        responses: {
          200: jsonResponse("Personal content", { $ref: "#/components/schemas/Personal" }),
          404: messageResponse("No data", "Cannot find any Personal data"),
          500: { description: "Server error" },
        },
      },
    },
    "/api/personal/{id}": {
      put: {
        tags: ["Personal"],
        summary: "Update personal page content",
        parameters: [mongoIdParam],
        requestBody: jsonBody("#/components/schemas/PersonalInput"),
        responses: {
          200: jsonResponse("Updated", { $ref: "#/components/schemas/Personal" }),
          400: errorResponse("Invalid update or id"),
          404: messageResponse("Not found", "Count not update Personal data!"),
        },
      },
    },
  },

  components: {
    schemas: {
      Error: {
        type: "object",
        properties: { error: { type: "string" } },
      },
      Message: {
        type: "object",
        properties: { message: { type: "string" } },
      },

      ProjectField: {
        type: "object",
        properties: {
          title: { type: "string" },
          content: { type: "array", items: { type: "string" } },
          link: {
            type: "string",
            description: "Optional. Full URL starting with http:// or https://. When set, every content line links to it.",
            example: "https://ahalfprice.com",
          },
        },
      },
      ProjectInput: {
        type: "object",
        properties: {
          name: { type: "string", description: "Required on create" },
          nameId: { type: "string", description: "URL slug, required on create" },
          index: { type: "number", description: "Display order" },
          slider1: { type: "array", items: {} },
          slider2: { type: "array", items: {} },
          slider3: { type: "array", items: {} },
          title: { type: "string" },
          description: { type: "string" },
          paragraphs: { type: "array", items: {} },
          coverImg: { type: "array", items: {} },
          mobileIndexImg: { type: "string" },
          desktopIntroImg: { type: "string" },
          projectFields: { type: "array", items: { $ref: "#/components/schemas/ProjectField" } },
          isEnabled: { type: "boolean", default: true },
        },
        example: { name: "My Project", nameId: "my-project", index: 1, isEnabled: true },
      },
      Project: {
        allOf: [
          { $ref: "#/components/schemas/ProjectInput" },
          {
            type: "object",
            properties: { _id: { type: "string" }, __v: { type: "number" } },
          },
        ],
      },
      ProjectIndexItem: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          nameId: { type: "string" },
          index: { type: "number" },
          firstSlider3Item: { description: "First element of `slider3`" },
          mobileIndexImg: { type: "string" },
        },
      },
      ProjectNavItem: {
        type: "object",
        nullable: true,
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          nameId: { type: "string" },
        },
      },
      ProjectDetail: {
        type: "object",
        properties: {
          current: { $ref: "#/components/schemas/Project" },
          previous: { $ref: "#/components/schemas/ProjectNavItem" },
          next: { $ref: "#/components/schemas/ProjectNavItem" },
        },
      },
      DesktopIntroItem: {
        type: "object",
        properties: { desktopIntroImg: { type: "string" }, index: { type: "number" } },
      },
      MobileIntroItem: {
        type: "object",
        properties: { mobileIndexImg: { type: "string" }, index: { type: "number" } },
      },

      IntroMediaInput: {
        type: "object",
        properties: {
          name: { type: "string" },
          index: { type: "number" },
          url: { type: "string" },
        },
      },
      IntroMedia: {
        allOf: [
          { $ref: "#/components/schemas/IntroMediaInput" },
          { type: "object", properties: { _id: { type: "string" }, __v: { type: "number" } } },
        ],
      },

      PersonalImage: {
        type: "object",
        required: ["url"],
        properties: {
          url: { type: "string" },
          xPos: { type: "number" },
          yPos: { type: "number" },
          rotation: { type: "number" },
          height: { type: "number" },
          width: { type: "number" },
        },
      },
      PersonalInput: {
        type: "object",
        properties: {
          title: { type: "string" },
          heroTitle: { type: "string" },
          stackImages: { type: "array", items: { $ref: "#/components/schemas/PersonalImage" } },
          paragraphTitle1: { type: "string" },
          paragraph1: { type: "string" },
          paragraphTitle2: { type: "string" },
          paragraph2: { type: "string" },
          bodyImages: { type: "array", items: { $ref: "#/components/schemas/PersonalImage" } },
        },
      },
      Personal: {
        allOf: [
          { $ref: "#/components/schemas/PersonalInput" },
          { type: "object", properties: { _id: { type: "string" }, __v: { type: "number" } } },
        ],
      },
    },
  },
};
