import { useState } from 'react';
import { createPost } from '../api/blogApi';
import '../styles/NewPostForm.css';

export default function NewPostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await createPost({ title, body, userId: 1 });
      setTitle('');
      setBody('');
      if (onPostCreated) {
        onPostCreated(response.data);
      }
    } catch (err) {
      setError('Error al crear el post. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-post-form">
      <h2>Crear Nuevo Post</h2>
      {error && <div className="form-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Contenido</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={isSubmitting}
            rows={5}
          />
        </div>
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </form>
    </div>
  );
}