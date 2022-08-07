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
          <label className="form-label">Edit content:</label>
          <textarea
            rows={4}
            className="form-control"
            name="content"
            value={formData.content}
            onChange={handleFormDataChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
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
