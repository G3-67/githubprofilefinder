import React, { useState} from 'react';
import axios from 'axios';
import images from './images/location.png';
function App() {
   //https://api.github.com/users/G3-67.
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [avatarUrl,setAvatarUrl]= useState('');
  const [date,setdate] = useState('');
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data)
      setAvatarUrl(response.data.avatar_url);
      setdate(response.data.created_at);
      console.log(response.data);
      setError(null);
      
    } catch (error) {
      setUserData(null);
      setError('User not found');
    }
  };
  //date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  }
  
  // Example usage:
  const originalDateString = date;
  const formattedDateString = formatDate(originalDateString);
  

  return (
    
    <div>
      <h1 class="text-4xl font-black text-gray-900 dark:text-white">Github Profile Finder</h1><br></br>
      <div className="flex items-center">
        <div className="flex border border-purple-200 rounded">
      <input
        type="text"
        value={username}
        className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        onChange={handleInputChange}
        placeholder="Enter GitHub username"
      />
       <button className="px-4 bg-sky-400 hover:bg-sky-500 border-l rounded " onClick={fetchData}>Search</button>
      </div>
      </div><br></br>
     
      {userData && (
        <div class="max-w-lg h-5/6 p-6  bg-white border border--200 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
        {avatarUrl && (
        <img src={avatarUrl} alt="Avatar" className="w-20 h-20 rounded-full mt-4" />
      )}  
         
        <p class="text-3xl text-gray-900 dark:text-white">{userData.name}</p>
        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">{userData.login}</a>
        <p class="text-base text-gray-900 dark:text-white">{formattedDateString}</p>
        <p class="mb-3 text-justify text-gray-500 dark:text-gray-400">{userData.bio===null?"This profile has no bio":userData.bio}</p>
        <div class="flex justify-between">
        <p class="text-left">Repos<p class="text-center">{userData.public_repos}</p></p>
        <p class="text-center">Followers<p class="text-center">{userData.followers}</p></p>
        <p class="text-right">Following<p class="text-center">{userData.following}</p></p>
        
        </div>
        <div class="flex items-center max-w-sm pl-6">
          <img src={images} alt="" class="h-8 w-8 mr-2"/>
          <p class="text-sm font-semibold">{userData.location===null?"Not available":userData.location}</p>
          </div>

        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );

}
export default App;
