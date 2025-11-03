import axios from "axios";

// Función para obtener los posts guardados localmente
const getLocalPosts = () => {
  try {
    const savedPosts = localStorage.getItem('userCreatedPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  } catch (error) {
    console.error("Error al recuperar posts locales:", error);
    return [];
  }
};

// Función para guardar posts localmente
const saveLocalPosts = (posts) => {
  try {
    localStorage.setItem('userCreatedPosts', JSON.stringify(posts));
  } catch (error) {
    console.error("Error al guardar posts localmente:", error);
  }
};

// Inicializar con posts del usuario o vacío si no hay
const userPosts = getLocalPosts();

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Endpoints
export const getPosts = async () => {
  // Primero intentamos obtener los posts del usuario
  const localPosts = getLocalPosts();
  
  // Si hay posts locales, los devolvemos directamente
  if (localPosts.length > 0) {
    return { data: localPosts };
  }
  
  // Si no hay posts locales, intentamos obtenerlos de la API
  try {
    const response = await api.get("/posts");
    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { data: [] }; // Devolvemos un array vacío si no hay posts
  }
};

export const getPostById = async (id) => {
  // Primero buscamos en los posts locales
  const localPosts = getLocalPosts();
  const localPost = localPosts.find(p => p.id === parseInt(id));
  
  // Si encontramos el post localmente, lo devolvemos
  if (localPost) {
    return { data: localPost };
  }
  
  // Si no está localmente, intentamos obtenerlo de la API
  try {
    return await api.get(`/posts/${id}`);
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    return { data: null, error: "Post no encontrado" };
  }
};

// Añadir nuevo post
export const createPost = async (postData) => {
  try {
    // Intentamos crear el post en la API
    const response = await api.post("/posts", postData);
    
    // Independientemente del resultado de la API, guardamos localmente
    const newPost = {
      ...postData,
      id: Date.now(), // Usamos timestamp como ID único
      createdAt: new Date().toISOString()
    };
    
    // Obtenemos los posts actuales y añadimos el nuevo al principio
    const currentPosts = getLocalPosts();
    const updatedPosts = [newPost, ...currentPosts];
    
    // Guardamos los posts actualizados
    saveLocalPosts(updatedPosts);
    
    return { data: newPost };
  } catch (error) {
    console.error("Error creating post:", error);
    
    // Aunque falle la API, seguimos guardando localmente
    const newPost = {
      ...postData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    
    const currentPosts = getLocalPosts();
    const updatedPosts = [newPost, ...currentPosts];
    saveLocalPosts(updatedPosts);
    
    return { data: newPost };
  }
};
