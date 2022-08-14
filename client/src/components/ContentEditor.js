import React, { useState } from "react";

const ContentEditor = (props) => {
  const { content, handleSubmitEdit } = props;
  const [formData, setFormData] = useState({ content });

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label
            className="form-label my-2"
            style={{ color: "var(--bs-ternary)" }}
          >
            Edit content:
          </label>
          <textarea
            rows={4}
            className="form-control mb-3"
            name="content"
            value={formData.content}
            onChange={handleFormDataChange}
          />
          <button
            type="submit"
            className="btn"
            onClick={(e) => {
              handleSubmitEdit(e, formData);
            }}
            disabled={!formData.content}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContentEditor;
