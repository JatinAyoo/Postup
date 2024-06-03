import React, { useState } from 'react';
import bookmark from '../assets/bookmark.png';
import bookmarked from '../assets/bookmarked.png';
import { bookmarkPost, unbookmarkPost } from '../services/postAPI';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { timeSince } from '../services/timeSince';

const Post = ({ id, title, image, creatorName, creatorPhoto, createdAt, isSaved, tags }) => {
  const [saved, setSaved] = useState(isSaved);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    try {
      if (saved) {
        console.log('unsaving...');
        dispatch(unbookmarkPost(id, token));
        setSaved(false);
      } else {
        console.log('saving...');
        dispatch(bookmarkPost(id, token));
        setSaved(true);
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <div className="relative w-full md:w-6/12 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
              <img src={creatorPhoto} alt="user" className="absolute top-0 right-0 w-full h-full object-cover object-center" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">{creatorName}</h3>
              <p className="text-gray-500 text-sm">{timeSince(createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center">
            {saved ? (
              <img src={bookmarked} onClick={handleBookmarkClick} alt="bookmark" className="w-6 h-6 cursor-pointer" />
            ) : (
              <img src={bookmark} onClick={handleBookmarkClick} alt="bookmark" className="w-6 h-6 cursor-pointer" />
            )}
          </div>
        </div>
        <div className="relative w-full h-72 md:h-96 bg-gray-100">
          <img src={image} alt="Post" className="absolute top-0 right-0 w-full h-full object-cover object-center" />
        </div>
        <div className="p-4">
          <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <span key={tag} className="text-blue-500 text-sm font-medium mr-2 mb-2 px-2 py-1 bg-blue-100 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
