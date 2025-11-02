import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../api/blogApi";
import Loader from "../components/Loader";
import ErrorMsg from "../components/ErrorMsg";
import "../styles/PostDetail.css";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPost = () => {
    setLoading(true);
    setError(null);
    getPostById(id)
      .then(res => setPost(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <ErrorMsg message={error} onRetry={loadPost} />;

  return (
    <div className="post-detail">
      <h1 className="post-detail-title">{post.title}</h1>
      <p className="post-detail-body">{post.body}</p>
      <Link to="/" className="post-detail-back">Volver a la lista</Link>
    </div>
  );
}
