import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "content/homepage" }),
  schema: z.object({}).catchall(z.any()),
});

const changelogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "content/changelog" }),
  schema: z.object({}).catchall(z.any()),
});

const integrationsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "content/integrations" }),
  schema: z.object({}).catchall(z.any()),
});

const sectionsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "content/sections" }),
  schema: z.object({}).catchall(z.any()),
});

export const collections = {
  homepage: homepageCollection,
  changelog: changelogCollection,
  integrations: integrationsCollection,
  sections: sectionsCollection,
};
