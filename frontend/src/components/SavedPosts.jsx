import React, { useState, useEffect } from 'react';
import Post from './Post';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSavedPosts } from '../services/postAPI';
import toast from 'react-hot-toast';

const SavedPosts = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(() => setIsVisible(false), 700);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchPosts = async (page) => {
    try {
      const response = await dispatch(fetchSavedPosts(token, page));
      setPosts(response.data.savedPosts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Error fetching posts');
      console.error(error);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full h-full bg-custom-gradient min-h-screen">
      {posts.map((post) => (
        <Post
          key={post._id}
          id={post._id}
          title={post.title}
          image={post.image}
          creatorName={post.creator.username}
          creatorPhoto={post.creator.image}
          createdAt={post.createdAt}
          isSaved={true}
          tags={post.tags}
        />
      ))}
      <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full md:w-6/12 bg-white z-40 p-2 shadow-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex justify-center items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Prev
          </button>
          <span className="pt-2 mx-4">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedPosts;

