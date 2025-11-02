import { useEffect, useState } from "react";
import { getPosts } from "../api/blogApi";
import PostCard from "../components/PostCard";
import NewPostForm from "../components/NewPostForm";
import Notification from "../components/Notification";
import "../styles/Post.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      setPosts(res.data.slice(0, 10));
    } catch (error) {
      showNotification("Error al cargar los posts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    showNotification("¡Post creado con éxito!", "success");
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="posts-container">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}
      <NewPostForm onPostCreated={handlePostCreated} />
      <h2 className="posts-title">Artículos Recientes</h2>
      <div className="posts-grid">
        {posts.map(post => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
