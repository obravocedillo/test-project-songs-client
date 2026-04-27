import { PrimaryButton } from "../components/buttons/primaryButton";
import { SimpleTable } from "../components/table/simpleTable";
import { useGetSongsQuery } from "../store/services/songs";
import type { ISong } from "../store/types/songs";

export const Songs = () => {
  const { data: songsResult } = useGetSongsQuery();

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton onClick={() => {}} title="Add song" />
      </div>
    );
  };

  return (
    <SimpleTable<ISong>
      data={songsResult?.data || []}
      title="Songs"
      description="A list of all songs in the catalog."
      headerActions={headerActions()}
    />
  );
};
