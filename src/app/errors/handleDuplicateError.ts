import { TErrorSources, TGenericErrorRespons } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TGenericErrorRespons => {
  // console.log(err.message.match);

  // Extract value within double quotes using regex
  const match = err.message.match(/\{ (.+?) \}/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1] ? match[1] : 'Duplicate key'; // Fallback message

  const error: TErrorSources = [
    {
      path: '', // Optional: Set a specific path if available
      message: `${extractedMessage} already exists.`,
    },
  ];
  const statusCode = 400;

  console.log(error);
  return {
    statusCode,
    message: 'Duplicate key error.',
    error,
  };
};

export default handleDuplicateError;
