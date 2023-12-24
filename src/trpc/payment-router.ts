import { z } from "zod";
import { privateProcedure } from "./trpc";
import { TRPCError } from "@trpc/server";
import { getPayloadClient } from "../get-payload";
import { stripe } from "../lib/stripe";
import Stripe from "stripe";

export const paymentRouter = () => {
  createSession: privateProcedure
    .input(z.object({ prodictIds: z.array(z.string()) }))
    .mutation(async({ ctx, input }) => {
      const {user} = ctx
      let {productIds} = input

      if(productIds.lenght === 0){
        throw new TRPCError({code: 'BAD_REQUEST'})
      }
      const payload = await getPayloadClient()

      const {docs: products} = await payload.find({
        collection: 'products',
        where: {
          id: {
            in: productIds,
          }
        }
      })

      const filteredProducts = products.filter((prod)=> Boolean(prod.priceId))

      const order = await payload.create({
        collection: 'orders',
        data: {
          _isPaid: false,
          products : filteredProducts,
          user: user.id,
        }
      })

      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

      filteredProducts.forEach((product)=>{
        line_items.push({
          price: product.priceId!,
          quantity: 1
        })
      })

      line_items.push({
        price: 'price_1OQEXCFsBLoYxSiAtpuu07vs',
        quantity: 1,
        adjustable_quantity: {
          enabled:false
        }
      })

      try{ 
        const stripeSession = await stripe.checkout.sessions.create({
          success_url : `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
          payment_method_types: ['card', 'paypal'],
          mode: 'payment',
          metadata: {
            userId: user.id,
            orderId: order.id,
          },
          line_items: 
        }),


      }catch(){

      }

    }),
};
