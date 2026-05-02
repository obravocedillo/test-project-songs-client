import { Field } from "formik";
import { PrimaryForm } from "../../components/forms/primaryForm";
import type { IArtist } from "../../store/types/artists";
import * as Yup from "yup";

export const AddArtist = () => {
  const initialValues: Partial<IArtist> = {
    name: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  });

  const handleFormSubmissions = (values: Partial<IArtist>) => {
    console.log(values);
  };

  return (
    <PrimaryForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmissions}
    >
      {({ errors, touched }) => (
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Artist Name
          </label>
          <Field
            id="name"
            name="name"
            placeholder="e.g. The Beatles"
            className={`rounded-md border px-3 py-2 text-sm w-full outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.name && touched.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 text-xs">{errors.name}</span>
          )}
        </div>
      )}
    </PrimaryForm>
  );
};
