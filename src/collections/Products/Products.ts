import { ProductFile, User } from "./../../payload-types";
import { BeforeChangeHook } from "payload/dist/globals/config/types";
import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../../payload-types";
import { stripe } from "../../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
  const user = req.User;
  return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {}, // Define access rules as needed

  hooks: {
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;

          try {
            const createdProduct = await stripe.products.create({
              name: data.name,
              default_price: {
                currency: "USD",
                unit_amount: Math.round(data.price * 100),
              },
            });

            const updated: Product = {
              ...data,
              stripeID: createdProduct.id,
              priceId: createdProduct.default_price as string,
            };

            return updated;
          } catch (error) {
            console.error("Error creating product:", error);
            throw new Error("Product creation failed");
          }
        } else if (args.operation === "update") {
          const data = args.data as Product;

          try {
            const updatedProduct = await stripe.products.update(
              data.stripeID!,
              {
                name: data.name,
                default_price: data.priceId!,
              }
            );

            const updated: Product = {
              ...data,
              stripeID: updatedProduct.id,
              priceId: updatedProduct.default_price as string,
            };

            return updated;
          } catch (error) {
            console.error("Error updating product:", error);
            throw new Error("Product update failed");
          }
        }
      },
    ],
  },

  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      label: "Product details",
    },
    {
      name: "price",
      label: "Price in USD",
      min: 0,
      max: 10000,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
        label,
        value,
      })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      //only admin can take these actions
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeID",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
