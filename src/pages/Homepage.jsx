import { useState, useEffect } from "react";
import { instance } from "../api/axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await instance.get("/movie");
        setMovies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Errore nel recupero dei film:", err);
        setError("Si è verificato un errore durante il caricamento dei film. Riprova più tardi.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-center text-xl py-10">Caricamento...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Film in evidenza</h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-600 text-2xl">Nessun film disponibile.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id || index}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {movie.title || "Titolo non disponibile"}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Regista:</span> {movie.director || "Sconosciuto"}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Anno:</span> {movie.release_year || "N/D"}
              </p>
              <Link to={`/movie/${movie.id}`}>
                <button className="w-full bg-blue-500 text-white py-2 rounded-md shadow hover:bg-blue-600 transition">
                  Guarda Dettagli
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;