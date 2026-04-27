import { SimpleTable } from "../components/table/simpleTable";
import { useGetSongsQuery } from "../store/services/songs";

export const Songs = () => {
  const { data: songsResult, isSuccess } = useGetSongsQuery();

  return isSuccess ? (
    <SimpleTable data={songsResult.data} title="Songs" description="Songs" />
  ) : null;
};
