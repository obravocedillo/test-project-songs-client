import { Form, Formik, type FormikProps } from "formik";
import * as Yup from "yup";

export interface IPrimaryForm<T extends Record<string, unknown>> {
  title?: string;
  initialValues: T;
  validationSchema: Yup.Schema;
  onSubmit: (values: T) => void;
  children: (formik: FormikProps<T>) => React.ReactNode;
}

export const PrimaryForm = <T extends Record<string, unknown>>({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: IPrimaryForm<T>) => {
  const handlesFormSubmissions = (values: T) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div>
      {title && (
        <h2 className="text-xl font-medium text-gray-600 uppercase tracking-widest">
          {title}
        </h2>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values: T) => {
          handlesFormSubmissions(values);
        }}
      >
        {(formikProps) => (
          <Form>
            {children(formikProps)}
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
