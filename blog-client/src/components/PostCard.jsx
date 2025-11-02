import { Link } from "react-router-dom";
import "../styles/PostCard.css";

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="post-card">
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-body">{post.body.substring(0, 80)}...</p>
    </Link>
  );
}
