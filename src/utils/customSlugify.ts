import slugify from "slugify";
export const customSlugify = (string: string) => slugify(string, { lower: true });
