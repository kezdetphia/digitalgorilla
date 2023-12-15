import { CollectionConfig } from "payload/types";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  access: {
    read: () => true, // Anyone can view the collection
    create: ()=>true // Only authenticated users can add to the collection
  },
  fields: [
    {
      name: "role",
      defaultValue: 'user',
      required:true,
      // admin: {
      //   condition: ()=>false,
      // },
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
