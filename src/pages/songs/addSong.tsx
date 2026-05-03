import { Field } from "formik";
import { PrimaryForm } from "../../components/forms/primaryForm";
import * as Yup from "yup";
import type { ISong } from "../../store/types/songs";
import {
  useSaveSongMutation,
  useUpdateSongMutation,
} from "../../store/services/songs";

interface IAddSongProps {
  onSuccess: () => void;
  songData: ISong | null;
}

export const AddSong = ({ onSuccess, songData }: IAddSongProps) => {
  const isEdit = songData !== null;

  const initialValues: Partial<ISong> = {
    title: songData?.title ?? "",
    duration: songData?.duration ?? 0,
  };

  const [saveSong] = useSaveSongMutation();
  const [updateSong] = useUpdateSongMutation();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Song title is required"),
    duration: Yup.number()
      .integer("Duration must be an integer")
      .min(1, "Duration must be at least 1")
      .required("Song duration is required"),
  });

  const handleFormSubmissions = async (values: Partial<ISong>) => {
    if (!isEdit) {
      const saveSongResult = await saveSong({ objectInformation: values });

      if (saveSongResult.data) {
        onSuccess();
      }

      return;
    }

    const updateSongResult = await updateSong({
      objectId: songData?.id,
      objectInformation: values,
    });

    if (updateSongResult.data) {
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
        const showTitleError =
          (errors.title && touched.title) || (errors.title && submitCount > 0);
        const showDurationError =
          (errors.duration && touched.duration) ||
          (errors.duration && submitCount > 0);
        return (
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Song Name
            </label>
            <Field
              id="title"
              name="title"
              placeholder="e.g. The Beatles"
              className={`rounded-md border px-3 py-2 text-sm w-full outline-none transition focus:ring-2 focus:ring-blue-500 ${
                showTitleError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showTitleError && (
              <span className="text-red-500 text-xs">{errors.title}</span>
            )}

            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Song Duration
            </label>
            <Field
              id="duration"
              name="duration"
              type="number"
              placeholder="e.g. 10"
              className={`rounded-md border px-3 py-2 text-sm w-full outline-none transition focus:ring-2 focus:ring-blue-500 ${
                showDurationError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {showDurationError && (
              <span className="text-red-500 text-xs">{errors.duration}</span>
            )}
          </div>
        );
      }}
    </PrimaryForm>
  );
};
