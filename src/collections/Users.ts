import { PriaryActionEmailHtml } from "@/components/emails/PrimaryActionEmails";
import { CollectionConfig, Access } from "payload/types";

const adminsAnduser: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;
  return {
    id: {
      equals: user.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token }) => {
        return PriaryActionEmailHtml({
          actionLabel: 'verify your account',
          buttonText: 'Verify Account',
          href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
        })
      },
    },
  },
  access: {
    read: adminsAnduser, // Anyone can view the collection
    create: () => true, // Only authenticated users can add to the collection
    update: ({req})=> req.user.role === 'admin',
    delete: ({req})=> req.user.role === 'admin'
  },
  admin: {
    hidden: ({user})=> user.role !== 'admin',
    defaultColumns: ['id']
  },

  fields: [
    {
      name: "products",
      label: "Products",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
    {
      name: "product_files",
      label: "Product files",
      admin: {
        condition: () => false,
      },
      type: "relationship",
      relationTo: "product_files",
      hasMany: true,
    },

    {
      name: "role",
      defaultValue: "user",
      required: true,
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
