import { PrimaryButton } from "../components/buttons/primaryButton";
import { SimpleTable } from "../components/table/simpleTable";
import { useGetArtistsQuery } from "../store/services/artists";
import type { IArtist } from "../store/types/artists";

export const Artist = () => {
  const { data: artistsResult } = useGetArtistsQuery();

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton onClick={() => {}} title="Add artist" />
      </div>
    );
  };

  return (
    <SimpleTable<IArtist>
      data={artistsResult?.data || []}
      title="Artists"
      description="A list of all artists in the catalog."
      headerActions={headerActions()}
    />
  );
};
