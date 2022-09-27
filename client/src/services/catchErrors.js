const DEFAULT_ERROR = {
  message: 'Something went wrong. Please try again.',
};

const catchErrors = (err) => {
  if (err.response.data) {
    return err.response.data.errors;
  } else {
    return [DEFAULT_ERROR];
  }
};

export default catchErrors;
