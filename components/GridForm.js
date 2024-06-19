// components/GridForm.js
import React, { useState } from "react";

const GridForm = ({
  open,
  setOpen,
  onSubmit,
  setFormValues,
  formValues,
  handleChange,
  handleAddFormFields,
  handelModelClose,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {formValues.map((formValue, index) => (
        <div key={index} className="space-y-2">
          <p className="text-purple mt-1 mb-1 text-sm">Title</p>
          <input
            type="text"
            name="title"
            value={formValue.title}
            onChange={(e) => handleChange(e, index)}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <p className="text-purple mt-1 mb-1 text-sm">Description</p>
          <input
            type="text"
            name="description"
            value={formValue.description}
            onChange={(e) => handleChange(e, index)}
            placeholder="Description"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <p className="text-purple mt-1 mb-1 text-sm">Class Name</p>
          <input
            type="text"
            name="className"
            value={formValue.className}
            onChange={(e) => handleChange(e, index)}
            placeholder="Class Name (lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh])"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <p className="text-purple mt-1 mb-1 text-sm">Image className</p>
          <input
            type="text"
            name="imgClassName"
            value={formValue.imgClassName}
            onChange={(e) => handleChange(e, index)}
            placeholder="Image Class Name (w-full h-full)"
            className="w-full p-2 border border-gray-300 rounded mb-2.5 mt-10"
          />
          <p className="text-purple mt-1 mb-1 text-sm">Title Class Name</p>
          <input
            type="text"
            name="titleClassName"
            value={formValue.titleClassName}
            onChange={(e) => handleChange(e, index)}
            placeholder="Title Class Name (justify-end)"
            className="w-full p-2 border border-gray-300 rounded mb-2.5 mt-10"
          />
          <p className="text-purple mt-1 mb-1 text-sm"> Image UR</p>
          <input
            type="text"
            name="img"
            value={formValue.img}
            onChange={(e) => handleChange(e, index)}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded mb-2.5 mt-10"
          />
          <p className="text-purple mt-1 mb-1 text-sm">Spare Image UR</p>
          <input
            type="text"
            name="spareImg"
            value={formValue.spareImg}
            onChange={(e) => handleChange(e, index)}
            placeholder="Spare Image URL"
            className="w-full p-2 border border-gray-300 rounded mb-2.5 mt-10"
          />
        </div>
      ))}
      <div className="flex justify-center items-center gap-4 flex-wrap mt-5 pt-[12px]">
        <button
          type="button"
          onClick={handleAddFormFields}
          className="px-4 py-2 bg-green-500 text-white rounded mb-2.5"
        >
          Add More
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2.5 inline-block"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default GridForm;
