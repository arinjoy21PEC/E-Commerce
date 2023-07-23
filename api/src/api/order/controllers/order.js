const stripe = require('stripe')(process.env.STRIPE_KEY);
/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products } = ctx.request.body;
    if (!products || !Array.isArray(products)) {
      ctx.response.status = 400;
      return { error: 'Invalid data: products array is required' };
    }
    
    // Validate each product item in the array
    for (const product of products) {
      if (!product.id) {
        ctx.response.status = 400;
        return { error: 'Invalid data: product id is required and must be a string' };
      }
      if (!product.quantity || typeof product.quantity !== 'number' || product.quantity < 1) {
        ctx.response.status = 400;
        return { error: 'Invalid data: product quantity is required and must be a positive integer' };
      }
    }
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);
            console.log(product.id)
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: product.quantity,
          };
        })
      );
      try {
      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {allowed_countries: ['IN']},
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL+"?success=true",
        cancel_url: process.env.CLIENT_URL+"?success=false",
        line_items: lineItems,
      });

      await strapi
        .service("api::order.order")
        .create({ data: {  products, stripeId: session.id } });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));