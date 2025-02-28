import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { instance } from "../api/axios";

export default function MoviePage() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    instance
      .get(`/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          navigate("/404");
        }
      });
  }, [id, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{movie.title || "Titolo non disponibile"}</h1>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Genere:</span> {movie.genre || "Sconosciuto"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Regista:</span> {movie.director || "Sconosciuto"}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Anno:</span> {movie.release_year || "N/D"}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Trama:</span> {movie.abstract || "Sconosciuto"}
        </p>
        <button className="w-full bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600 transition">
          Guarda il Trailer
        </button>
      </div>
    </div>
  );
}