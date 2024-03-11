import { Request, Response } from "express";
import Stripe from "stripe";
import { validator } from "../validation/validator";
import { createSessionSchema } from "../validation/stripe.schema";
import isGenericError from "../types/isGenericError";
import GenericError from "../helpers/GenericError";
import log from "../helpers/logger";

const createSession = async (req: Request, res: Response) => {
  const { secret_key, currency, unit_amount, quantity, success_url, cancel_url }: any = req.body;

  log('in request createSession')
  try {
    const { isValid, error } = await validator({
      data: req.body,
      schema: createSessionSchema,
    });

    if (!isValid) throw new GenericError(error, 400);

    const stripe = new Stripe(secret_key, {
      apiVersion: "2023-10-16",
      typescript: true,
    });

    const stripeRes = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: "ICP",
            },
            unit_amount,
          },
          quantity,
        },
      ],
      mode: "payment",
      success_url,
      cancel_url,
    });

    log(`createSession: success ${JSON.stringify(stripeRes)}`)

    res.json({ status: 200, id: stripeRes.id, url: stripeRes.url });
  } catch (error: any) {
    if (!isGenericError(error)) {
      log(`createSession error: ${JSON.stringify(error)}`)
      throw new GenericError(error, 500);
    }

    const typedError = error as GenericError;
    log(`createSession error: ${JSON.stringify(typedError)}`)
    res.status(typedError.statusCode).json({
      status: typedError.statusCode,
      message: typedError.message,
    });
  }
};

export { createSession };
