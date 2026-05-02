import { useState } from "react";
import { PrimaryButton } from "../../components/buttons/primaryButton";
import { PrimaryModal } from "../../components/modal/primaryModal";
import { SimpleTable } from "../../components/table/simpleTable";
import { useGetArtistsQuery } from "../../store/services/artists";
import type { IArtist } from "../../store/types/artists";
import { AddArtist } from "./addArtist";

export const Artist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: artistsResult } = useGetArtistsQuery();

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
      />

      <PrimaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Artist"
      >
        <AddArtist />
      </PrimaryModal>
    </>
  );
};
