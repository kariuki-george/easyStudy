export const isSuccess = (data) => {
  return {
    data,
    success: true,
  };
};

export const isError = (error) => {
  return {
    error,
    success: false,
  };
};

