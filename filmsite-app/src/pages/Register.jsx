import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert("Şifreler eşleşmiyor.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/register", {
                username,
                email,
                password,
            });

            alert("Kayıt başarılı.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("Kayıt başarısız.");
        }
    };

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleRegister}>
                <h1>Kayıt Ol</h1>

                <input
                    type="text"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="E-posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Şifre Tekrar"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />

                <button type="submit">Kayıt Ol</button>

                <p>
                    Zaten hesabın var mı?{" "}
                    <Link to="/login" className="login-link">
                        Giriş Yap
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Register;