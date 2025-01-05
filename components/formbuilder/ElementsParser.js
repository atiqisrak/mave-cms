// components/formbuilder/ElementsParser.jsx
import React, { useContext } from "react";
import { FormBuilderContext } from "../../src/context/FormBuilderContext";
import { Button, message } from "antd";
import instance from "../../axios";

// A simpler "DisplayField" w/o drag-and-drop
function DisplayField({ element }) {
  switch (element.element_type) {
    case "input":
      // For brevity, just returning placeholders
      return (
        <input type={element.input_type} placeholder={element.placeholder} />
      );
    case "textarea":
      return <textarea rows={3} placeholder={element.placeholder} />;
    // ... more cases (select, location, etc.)
    default:
      return null;
  }
}

export default function ElementsParser({ form, setDrawerVisible }) {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useContext(FormBuilderContext);

  const formId = form?.id;

  const onSubmit = async (values) => {
    const submissionData = { form_id: formId, form_data: values };
    try {
      const response = await instance.post(
        form?.attributes?.action_url,
        submissionData
      );
      if (response.status === 201) {
        message.success("Form submitted successfully");
        setDrawerVisible?.(false);
      } else {
        message.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("An error occurred while submitting the form.");
    }
  };

  const handleReset = () => reset();

  return (
    <form
      id={form?.attributes?.component_id}
      className={form?.attributes?.component_class}
      encType={form?.attributes?.enctype}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-xl font-bold mb-2">{form?.title}</h3>
      <div
        className="mb-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: form?.description }}
      />

      {/* Use a simple DisplayField for each element */}
      {form?.elements?.map((element, idx) => (
        <div key={element.updated_on} className="mb-4">
          <DisplayField element={element} />
        </div>
      ))}

      {errors && Object.keys(errors).length > 0 && (
        <div className="text-red-500 text-sm my-2">
          Please fix the validation errors above.
        </div>
      )}

      {/* Example Submit Button */}
      <button type="submit" className="bg-theme text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
