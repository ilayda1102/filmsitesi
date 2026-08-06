import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

function List() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const getLists = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5000/api/lists",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        getLists();
    }, []);

    return (
        <>
            <div className="list-page">
                <div className="container">

                    <h1 className="list-title">Listelerim</h1>

                    {lists.length === 0 ? (
                        <div className="list-empty">
                            <div>
                                <p>Henüz hiç listeniz yok.</p>

                                <Link to="/" className="discover-btn">
                                    Keşfetmeye Başla
                                </Link>
                            </div>
                        </div>
                    ) : (
                        lists.map((list) => (
                            <section
                                key={list.id}
                                className="list-row"
                            >
                                <h2 className="list-row-title">
                                    {list.name}
                                </h2>

                                <div className="list-slider">
                                    {list.items?.length > 0 ? (
                                        list.items.map((movie) => (
                                            <div
                                                key={movie.id}
                                                className="list-movie-card"
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                                                    alt={movie.title}
                                                />

                                                <p className="list-movie-title">
                                                    {movie.title}
                                                </p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="list-empty-slider">
                                            <p>Bu listede henüz film yok.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
}

export default List;