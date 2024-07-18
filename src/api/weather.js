export const getWeather = async (cityName, username) => {
    try {
      const token = localStorage.getItem('accessToken');
  
      const response = await fetch(`http://127.0.0.1:8000/get-weather/${cityName}/?username=${username}`, {
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
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
