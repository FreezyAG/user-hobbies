/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import Joi from "joi";

export const PostUserRequestBody = Joi.object({
  firstName: Joi.string().min(1).required(),
  lastName: Joi.string().min(1).required(),
});

export const PatchUserRequestBody = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
});
