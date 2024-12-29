import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorRespons } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorRespons => {
  const error: TErrorSources = [
    {
      path: err.name,
      message: err.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID.',
    error,
  };
};

export default handleCastError;
