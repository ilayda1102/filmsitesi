function Alert({ message, type }) {
    if (!message) return null;

    return (
        <div className="alert-overlay">
            <div className={`alert-box ${type}`}>
                {message}
            </div>
        </div>
    );
}

export default Alert;