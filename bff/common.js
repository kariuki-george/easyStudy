const isSuccess = (data) => {
  return {
    data,
    success: true,
  };
};

const isError = (error) => {
  return {
    error,
    success: false,
  };
};

module.exports = { isSuccess, isError };
