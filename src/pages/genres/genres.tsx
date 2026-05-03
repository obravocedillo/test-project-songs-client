import { useState } from "react";
import { PrimaryButton } from "../../components/buttons/primaryButton";
import { SimpleTable } from "../../components/table/simpleTable";
import {
  useDeleteGenreMutation,
  useGetGenresQuery,
} from "../../store/services/genres";
import type { IGenre } from "../../store/types/genres";
import ConfirmationModal from "../../components/modal/confirmationModal";
import { PrimaryModal } from "../../components/modal/primaryModal";
import { AddGenre } from "./addGenre";

export const Genres = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<IGenre | null>(null);

  const { data: genresResult } = useGetGenresQuery();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  const handleDeleteGenre = async () => {
    if (selectedGenre) {
      setIsDeleteModalOpen(false);

      await deleteGenre({ id: selectedGenre.id });

      setSelectedGenre(null);
    }
  };

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          title="Add genre"
        />
      </div>
    );
  };

  return (
    <>
      <SimpleTable<IGenre>
        data={genresResult?.data || []}
        title="Genres"
        description="A list of all genres in the catalog."
        headerActions={headerActions()}
        deleteItemOnClick={(item: IGenre) => {
          setIsDeleteModalOpen(true);
          setSelectedGenre(item);
        }}
        editItemOnClick={(item: IGenre) => {
          setIsModalOpen(true);
          setSelectedGenre(item);
        }}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Genre"
        message="Are you sure you want to delete this genre?"
        onConfirm={() => {
          handleDeleteGenre();
        }}
      />

      <PrimaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Genre"
      >
        <AddGenre onSuccess={handleSuccess} genreData={selectedGenre} />
      </PrimaryModal>
    </>
  );
};
