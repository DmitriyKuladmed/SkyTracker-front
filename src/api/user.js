export const registerUser = async (email, username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/create-profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to register user');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};


export const loginUser = async (username, password) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
