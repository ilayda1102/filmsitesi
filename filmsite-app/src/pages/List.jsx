import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function List() {
    return (
    <>
        <div className="list-page">
            <div className="container">

                <h1 className="list-title">Listem</h1>

                <div className="list-empty">
                    <div>

                        <p>Listenizde dizi veya film yok.</p>

                        <Link to="/" className="discover-btn">
                            Keşfetmeye Başla
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    <Footer />
    </>
    );
}

export default List;

