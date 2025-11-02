import "../styles/ErrorMsg.css";

export default function ErrorMsg({ message, onRetry }) {
  return (
    <div className="error-message">
      <p>{message || "Ocurrió un error inesperado"}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-button">
          Reintentar
        </button>
      )}
    </div>
  );
}