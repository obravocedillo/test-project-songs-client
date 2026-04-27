import { PrimaryButton } from "../components/buttons/primaryButton";
import { SimpleTable } from "../components/table/simpleTable";
import { useGetGenresQuery } from "../store/services/genres";
import type { IGenre } from "../store/types/genres";

export const Genres = () => {
  const { data: genresResult } = useGetGenresQuery();

  const headerActions = () => {
    return (
      <div>
        <PrimaryButton onClick={() => {}} title="Add genre" />
      </div>
    );
  };

  return (
    <SimpleTable<IGenre>
      data={genresResult?.data || []}
      title="Genres"
      description="A list of all genres in the catalog."
      headerActions={headerActions()}
    />
  );
};
