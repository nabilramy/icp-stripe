import * as yup from "yup";

export const createSessionSchema = yup.object().shape({
  secret_key: yup.string().required(),
  currency: yup.string().required(),
  unit_amount: yup.number().required().positive(),
  quantity: yup.number().required().positive(),
  success_url: yup.string().required().url(),
  cancel_url: yup.string().required().url()
});
