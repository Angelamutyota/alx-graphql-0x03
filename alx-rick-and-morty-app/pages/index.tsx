import { useQuery } from "@apollo/client/react";
import { GET_EPISODES } from "@/graphql/queries";
import { EpisodeProps, EpisodesResponse, GetEpisodesResponse } from "@/interfaces";
import EpisodeCard from "@/components/common/EpisodeCard";
import { useState } from "react";

const Home: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const { loading, error, data } = useQuery<GetEpisodesResponse>(
  GET_EPISODES,
  {
    variables: { page },
  }
);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;

  const results: EpisodeProps[] = data?.episodes.results ?? [];
  const info = data?.episodes.info;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">
          Rick and Morty Episodes
        </h1>
        <p className="mt-2 text-lg italic">
          Explore the multiverse of adventures!
        </p>
      </header>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(({ id, name, air_date, episode }) => (
            <EpisodeCard
              key={id}
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}
            />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80]"
          >
            Previous
          </button>

          <button
            onClick={() =>
              setPage((prev) =>
                info && prev < info.pages ? prev + 1 : prev
              )
            }
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80]"
          >
            Next
          </button>
        </div>
      </main>

      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2024 Rick and Morty Fan Page</p>
      </footer>
    </div>
  );
};

export default Home;
