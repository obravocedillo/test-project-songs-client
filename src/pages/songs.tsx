import { useState } from "react";
import { PrimaryButton } from "../components/buttons/primaryButton";
import { PrimaryModal } from "../components/modal/primaryModal";
import { SimpleTable } from "../components/table/simpleTable";
import { useGetSongsQuery } from "../store/services/songs";
import type { ISong } from "../store/types/songs";

export const Songs = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: songsResult } = useGetSongsQuery();

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton
          onClick={() => {
            setIsOpen(true);
          }}
          title="Add song"
        />
      </div>
    );
  };

  return (
    <>
      <PrimaryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Song"
      >
        Test
      </PrimaryModal>

      <SimpleTable<ISong>
        data={songsResult?.data || []}
        title="Songs"
        description="A list of all songs in the catalog."
        headerActions={headerActions()}
        newItemOnClick={() => {
          setIsOpen(true);
        }}
      />
    </>
  );
};
