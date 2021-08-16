/* -------------------------------------------------------------------------- */
/*                              external imports                              */
/* -------------------------------------------------------------------------- */
import Joi from "joi";

export const PostHobbyRequestBody = Joi.object({
  name: Joi.string().required(),
  passionLevel: Joi.string()
    .valid("low", "medium", "high", "very-high")
    .insensitive()
    .required(),
  year: Joi.number().min(1900).max(2021).required(),
});

export const PatchHobbyRequestBody = Joi.object({
  name: Joi.string().optional(),
  passionLevel: Joi.string()
    .valid("low", "medium", "high", "very-high")
    .insensitive()
    .optional(),
  year: Joi.number().min(1900).max(2021).optional(),
});
