export const getLatestCities = async (username) => {
    try {
      const token = localStorage.getItem('accessToken');
  
      const response = await fetch(`http://127.0.0.1:8000/latest-cities/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest cities:', error);
      return null;
    }
  };


  export const searchCities = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${query}&format=json&addressdetails=1&limit=5`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.map(city => city.display_name);
    } catch (error) {
      console.error('Error searching cities:', error);
      return [];
    }
  };


  export const getLatestProfileCities = async (username) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://127.0.0.1:8000/latest-profile-cities/${username}/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching latest cities:', error);
      return null;
    }
  };