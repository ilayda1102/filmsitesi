import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiArrowLeft, HiEllipsisVertical, HiTrash } from "react-icons/hi2";


function List() {
    const [lists, setLists] = useState([]);
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(null);

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

                console.log(res.data[1].items);
                setLists(res.data);
                
            } catch (err) {
                console.log(err);
            }
        };

        getLists();
    }, []);

    const deleteList = async (listId) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(
                `http://localhost:5000/api/lists/${listId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLists((prevLists) =>
                prevLists.filter((list) => list.id !== listId)
            );

            setOpenMenu(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="list-page">
                <div className="container">

                    <div className="list-page-header">
                        <button
                            className="back-btn"
                            onClick={() => navigate("/")}
                        >
                            <HiArrowLeft size={22} />
                        </button>

                        <h1 className="list-title">Listem</h1>
                    </div>

                    {lists.length === 0 ? (
                        <div className="list-empty">
                            <div>
                                <p>Henüz hiç listeniz yok.</p>
                            </div>
                        </div>
                    ) : (
                        lists.map((list) => (
                            <section
                                key={list.id}
                                className="list-row"
                            >

                                <div className="list-row-header">

                                    <h2 className="list-row-title">
                                        {list.name}
                                    </h2>

                                    <div 
                                        className="list-menu-wrapper"
                                        onMouseEnter={() => setOpenMenu(list.id)}
                                        onMouseLeave={() => setOpenMenu(null)}
                                    >

                                        <button className="list-menu-btn">
                                            <HiEllipsisVertical size={20} />
                                        </button>

                                        {openMenu === list.id && (
                                            <div className="list-menu">
                                                <button
                                                    className="delete-list-btn"
                                                    onClick={() => deleteList(list.id)}
                                                >
                                                    <HiTrash size={18} />
                                                    Listeyi Sil
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>

                                <div className="list-slider-wrapper">
                                    <div className="list-slider">
                                        {list.items?.length > 0 ? (
                                            list.items.map((movie) => (
                                                <div
                                                    key={movie.id}
                                                    className="list-movie-card"
                                                >
                                                    <img
                                                        src={
                                                            movie.backdropPath
                                                            ? `https://image.tmdb.org/t/p/w780${movie.backdropPath}`
                                                            : movie.posterPath
                                                            ? `https://image.tmdb.org/t/p/w780${movie.posterPath}`
                                                            : "/no-image.png"
                                                        }
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
                                </div>
                            </section>
                        ))
                    )}

                </div>
            </div>

        </>
    );
}

export default List;