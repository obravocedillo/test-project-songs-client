import { Field } from "formik";
import { PrimaryForm } from "../../components/forms/primaryForm";
import type { IArtist } from "../../store/types/artists";
import * as Yup from "yup";
import {
  useSaveArtistMutation,
  useUpdateArtistMutation,
} from "../../store/services/artists";

interface IAddArtistProps {
  onSuccess: () => void;
  artistData: IArtist | null;
}

export const AddArtist = ({ onSuccess, artistData }: IAddArtistProps) => {
  const isEdit = artistData !== null;

  const initialValues: Partial<IArtist> = {
    name: artistData?.name ?? "",
  };

  const [saveArtist] = useSaveArtistMutation();
  const [updateArtist] = useUpdateArtistMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Artist name is required"),
  });

  const handleFormSubmissions = async (values: Partial<IArtist>) => {
    if (!isEdit) {
      const saveArtistResult = await saveArtist({ objectInformation: values });

      if (saveArtistResult.data) {
        onSuccess();
      }

      return;
    }

    const updateArtistResult = await updateArtist({
      objectId: artistData?.id,
      objectInformation: values,
    });

    if (updateArtistResult.data) {
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
              Artist Name
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
