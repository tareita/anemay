import React from "react";

const Loading = () => {
  return (
    <div class="d-flex justify-content-center">
      <div
        class="spinner-border"
        role="status"
        style={{ color: "var(--bs-ternary)" }}
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
