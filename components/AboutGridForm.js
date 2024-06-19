// components/ModalForm.js
import React, { useState, useEffect } from "react";

const AboutModalForm = ({ item, onClose, onSave }) => {
  const [formValues, setFormValues] = useState({ ...item });

  useEffect(() => {
    setFormValues({ ...item });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formValues);
    console.log(formValues, "val");
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-[1000000000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl mb-4">Edit Grid Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formValues.title !== undefined && (
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.description !== undefined && (
            <input
              type="text"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.className !== undefined && (
            <input
              disabled={
                formValues.id == 1 ||
                formValues.id == 2 ||
                formValues.id == 3 ||
                formValues.id == 4 ||
                formValues.id == 5 ||
                formValues.id == 6
              }
              type="text"
              name="className"
              value={formValues.className}
              onChange={handleChange}
              placeholder="Class Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.imgClassName !== undefined && (
            <input
              disabled
              type="text"
              name="imgClassName"
              value={formValues.imgClassName}
              onChange={handleChange}
              placeholder="Image Class Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.titleClassName !== undefined && (
            <input
              disabled
              type="text"
              name="titleClassName"
              value={formValues.titleClassName}
              onChange={handleChange}
              placeholder="Title Class Name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.img !== undefined && (
            <input
              disabled
              type="text"
              name="img"
              value={formValues.img}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.spareImg !== undefined && (
            <input
              disabled
              type="text"
              name="spareImg"
              value={formValues.spareImg}
              onChange={handleChange}
              placeholder="Spare Image URL"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          {formValues.id == 6 && (
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutModalForm;
