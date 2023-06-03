import Joi, { ValidationError } from 'joi';
import { useEffect, useState } from 'react';

interface UseValidateModelProps {
  model: any;
  modelSchema: Joi.ObjectSchema;
}

/**
 * Validates model against schema.
 */
export const useValidateModel = ({
  model,
  modelSchema,
}: UseValidateModelProps): {
  isModelValid: boolean,
  errorMessage: string | null;
} => {
  const [isModelValid, setIsModelValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      Joi.assert(model, modelSchema);
      setIsModelValid(true);
    } catch (error) {
      const { message } = error as ValidationError;
      setIsModelValid(false);
      setErrorMessage(message);
    }
  }, [model, modelSchema]);

  return {
    isModelValid,
    errorMessage,
  };
};