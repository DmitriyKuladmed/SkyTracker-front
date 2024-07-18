import React, { useEffect, useState } from 'react';
import { getLatestProfileCities } from '../api/cities';
import '../styles/profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileCities, setProfileCities] = useState([]);
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchProfileCities = async () => {
    if (username && email) {
      setUser({ username, email });
      try {
        if (username) {
          const { cities } = await getLatestProfileCities(username);
          if (Array.isArray(cities)) {
            cities.sort((a, b) => b.search_count - a.search_count);
            setProfileCities(cities);
          } else {
            console.error('Profile cities data is not an array:', cities);
            setProfileCities([]);
          }
        }
      } catch (error) {
        console.error('Error fetching profile cities:', error);
        setProfileCities([]);
      }
    }
  }; 

  fetchProfileCities();
  }, [username, email]);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Ваш профиль</h2>
        {user ? (
          <div>
            <p><strong>Имя пользователя:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Пользователь еще не авторизован.</p>
        )}
        {user && (
          <>
            <hr className="profile-divider" />
            <h3>Последние поисковые запросы</h3>
            <table className="city-table">
              <thead>
                <tr>
                  <th>Город</th>
                  <th>Количество поисков</th>
                </tr>
              </thead>
              <tbody>
                {profileCities.map((city, index) => (
                  <tr key={index}>
                    <td>{city.city_name}</td>
                    <td>{city.search_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;