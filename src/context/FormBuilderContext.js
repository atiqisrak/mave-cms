import React, { createContext } from "react";
import { useForm } from "react-hook-form";

export const FormBuilderContext = createContext({});

export function FormBuilderProvider({ children, defaultValues = {} }) {
  const methods = useForm({ defaultValues });

  return (
    <FormBuilderContext.Provider value={methods}>
      {children}
    </FormBuilderContext.Provider>
  );
}
