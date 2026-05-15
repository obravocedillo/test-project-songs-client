import { useState } from "react";
import { PrimaryButton } from "../../components/buttons/primaryButton";
import { PrimaryModal } from "../../components/modal/primaryModal";
import { SimpleTable } from "../../components/table/simpleTable";
import {
  useDeleteArtistMutation,
  useGetArtistsQuery,
  useLazySearchArtistQuery,
} from "../../store/services/artists";
import type { IArtist, IArtistSearch } from "../../store/types/artists";
import { AddArtist } from "./addArtist";
import ConfirmationModal from "../../components/modal/confirmationModal";
import { SearchSelect } from "../../components/select/searchSelect";

export const Artist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
  const [trigger, { data: searchData, isLoading }] = useLazySearchArtistQuery();

  const { data: artistsResult } = useGetArtistsQuery();
  const [deleteArtist] = useDeleteArtistMutation();

  const handleSuccess = () => {
    setIsModalOpen(false);
  };

  const handleDeleteArtist = async () => {
    if (selectedArtist) {
      setIsDeleteModalOpen(false);

      await deleteArtist({ id: selectedArtist.id });

      setSelectedArtist(null);
    }
  };

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton
          onClick={() => {
            setIsModalOpen(true);
          }}
          title="Add artist"
        />
      </div>
    );
  };

  return (
    <>
      <SimpleTable<IArtist>
        data={artistsResult?.data || []}
        title="Artists"
        description="A list of all artists in the catalog."
        headerActions={headerActions()}
        searchComponent={
          <SearchSelect<IArtistSearch>
            queryTrigger={trigger}
            searchKey="name"
            labelKey="name"
            onChange={(artist) => console.log(artist)}
            data={searchData?.data}
            isLoading={isLoading}
            fullWidth
          />
        }
        deleteItemOnClick={(item: IArtist) => {
          setIsDeleteModalOpen(true);
          setSelectedArtist(item);
        }}
        editItemOnClick={(item: IArtist) => {
          setIsModalOpen(true);
          setSelectedArtist(item);
        }}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Artist"
        message="Are you sure you want to delete this artist?"
        onConfirm={() => {
          handleDeleteArtist();
        }}
      />

      <PrimaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Artist"
      >
        <AddArtist onSuccess={handleSuccess} artistData={selectedArtist} />
      </PrimaryModal>
    </>
  );
};
