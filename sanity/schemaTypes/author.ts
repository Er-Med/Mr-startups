import { UserIcon } from "lucide-react";
// import { title } from "process";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "username",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "bio",
      type: "text",
    }),
    // defineField({
    //   name: "favoriteStartups",
    //   type: "array",
    //   of: [{ type: "reference", to: { type: "startup" } }],
    //   title: "Favorite Startups",
    //   description: "Startups this user has favorited",
    // }),
  ],
  preview: {
    select: {
      title: "name",
    },
  },
});

//   name: "author",
//   title: "Author",
//   type: "document",
//   icon: UserIcon,
//   fields: [
//     defineField({
//       name: "id",
//       type: "number",
//     }),
//     defineField({
//       name: "name",
//       type: "string",
//     }),
//     defineField({
//       name: "email",
//       type: "string",
//     }),
//     defineField({
//       name: "image",
//       type: "url",
//     }),
//     defineField({
//       name: "bio",
//       type: "text",
//     }),
//   ],
//   preview: {
//     select: {
//       title: "name",
//     },
//   },
// });
