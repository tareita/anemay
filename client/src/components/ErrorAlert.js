import React from "react";

const ErrorAlert = (props) => {
  const { error } = props;
  return (
    error && (
      <div className="my-2">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    )
  );
};

export default ErrorAlert;
