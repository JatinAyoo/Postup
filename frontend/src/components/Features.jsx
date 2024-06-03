import React from 'react';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-custom-gradient p-4">
      <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">Project Features</h1>
        <p className="text-gray-700 mb-8 text-center">
          Welcome to our project! Here is a detailed overview of the functionalities available:
        </p>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">User Authentication</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>User can sign up using Email by <b>OTP verification</b>.</li>
            <li><b>JWT tokens</b> used for authentication in protected routes.</li>
            <li>User can reset password by using <b>Forgot Password</b> on the login page.</li>
            <li>Handle sessions and token expiration effectively.</li>
            <li>Users can log out from their account using the logout option in the navbar.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">Posts with Pagination</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>Upon login, users are shown a list of posts.</li>
            <li>Posts are displayed with <b>pagination</b> for easy navigation.</li>
            <li>Users can <b>save posts</b> they like and unsave them as needed.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">Saved Posts</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            <li>In the navbar, users can click on "Saved Posts" to view all posts they have saved.</li>
            <li>This allows users to easily access their favorite posts at any time.</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-indigo-500">Best Practices</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
            
            <li>Use <b>environment variables</b> for sensitive information.</li>
            <li><b>Input validation</b> and sanitization to prevent vulnerabilities.</li>
            <li>Securely store passwords using strong hashing algorithms <b>bcrypt</b>.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
