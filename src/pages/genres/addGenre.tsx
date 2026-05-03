import { Field } from "formik";
import { PrimaryForm } from "../../components/forms/primaryForm";
import type { IGenre } from "../../store/types/genres";
import * as Yup from "yup";
import {
  useSaveGenreMutation,
  useUpdateGenreMutation,
} from "../../store/services/genres";

interface IAddGenreProps {
  onSuccess: () => void;
  genreData: IGenre | null;
}

export const AddGenre = ({ onSuccess, genreData }: IAddGenreProps) => {
  const isEdit = genreData !== null;

  const initialValues: Partial<IGenre> = {
    name: genreData?.name ?? "",
  };

  const [saveGenre] = useSaveGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Genre name is required"),
  });

  const handleFormSubmissions = async (values: Partial<IGenre>) => {
    if (!isEdit) {
      const saveGenreResult = await saveGenre({ objectInformation: values });

      if (saveGenreResult.data) {
        onSuccess();
      }

      return;
    }

    const updateGenreResult = await updateGenre({
      objectId: genreData?.id,
      objectInformation: values,
    });

    if (updateGenreResult.data) {
      onSuccess();
    }
  };

  return (
    <PrimaryForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmissions}
      submitButtonText={isEdit ? "Update" : "Submit"}
    >
      {({ errors, touched, submitCount }) => {
        const showError =
          (errors.name && touched.name) || (errors.name && submitCount > 0);
        return (
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Genre Name
            </label>
            <Field
              id="name"
              name="name"
              placeholder="e.g. The Beatles"
              className={`rounded-md border px-3 py-2 text-sm w-full outline-none transition focus:ring-2 focus:ring-blue-500 ${
                showError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showError && (
              <span className="text-red-500 text-xs">{errors.name}</span>
            )}
          </div>
        );
      }}
    </PrimaryForm>
  );
};
