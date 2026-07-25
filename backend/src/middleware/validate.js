/**
 * Zod validation middleware factory.
 *
 * Returns an Express middleware that validates the specified request source
 * against a Zod schema. If validation fails, it returns a 422 with structured
 * field-level errors. If it passes, it replaces the raw input with Zod's
 * parsed/transformed output before passing to the next middleware.
 *
 * @param {import('zod').ZodSchema} schema - The Zod schema to validate against
 * @param {'body' | 'query' | 'params'} source - Which part of the request to validate
 *
 * Usage:
 *   router.post('/leads', validate(createLeadSchema), leadsController.create);
 */
export const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return res.status(422).json({
        success: false,
        message: 'Validation failed. Please check the provided data.',
        errors,
      });
    }

    // Replace raw input with validated & potentially transformed data
    // This ensures controllers always receive clean, typed data
    req[source] = result.data;
    next();
  };
};
