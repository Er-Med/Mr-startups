"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { markdownSchema } from "sanity-plugin-markdown";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    markdownSchema(),
  ],
  // Add error handling and logging
  onError: (error: Error) => {
    console.error("Sanity Studio Error:", error);
  },
  // Add production-specific configuration
  title: "MR Startups Studio",
  // Ensure proper API versioning
  apiVersion,
  // Add authentication configuration for production
  auth: {
    providers: [
      {
        name: "sanity",
        title: "Sanity",
        url: "https://api.sanity.io/v1/auth/sanity/login",
      },
    ],
  },
});
