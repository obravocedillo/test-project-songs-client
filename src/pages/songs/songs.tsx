import { useState } from "react";
import { PrimaryButton } from "../../components/buttons/primaryButton";
import { PrimaryModal } from "../../components/modal/primaryModal";
import { SimpleTable } from "../../components/table/simpleTable";
import type { ISong } from "../../store/types/songs";
import ConfirmationModal from "../../components/modal/confirmationModal";
import { AddSong } from "./addSong";
import {
  useDeleteSongMutation,
  useGetSongsQuery,
} from "../../store/services/songs";

export const Songs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState<ISong | null>(null);

  const { data: songsResult } = useGetSongsQuery();
  const [deleteSong] = useDeleteSongMutation();

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  const handleDeleteSong = async () => {
    if (selectedSong) {
      setIsDeleteModalOpen(false);

      await deleteSong({ id: selectedSong.id });

      setSelectedSong(null);
    }
  };

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          title="Add song"
        />
      </div>
    );
  };

  return (
    <>
      <SimpleTable<ISong>
        data={songsResult?.data || []}
        title="Songs"
        description="A list of all songs in the catalog."
        headerActions={headerActions()}
        deleteItemOnClick={(item: ISong) => {
          setIsDeleteModalOpen(true);
          setSelectedSong(item);
        }}
        editItemOnClick={(item: ISong) => {
          setIsModalOpen(true);
          setSelectedSong(item);
        }}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Song"
        message="Are you sure you want to delete this song?"
        onConfirm={() => {
          handleDeleteSong();
        }}
      />

      <PrimaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Song"
      >
        <AddSong onSuccess={handleSuccess} songData={selectedSong} />
      </PrimaryModal>
    </>
  );
};
