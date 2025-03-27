import axios from 'axios';

export const getUserDetails = () => {
  try {
    const persistedData = localStorage.getItem("persist:root");
    if (!persistedData) return null;
    return JSON.parse(JSON.parse(persistedData).auth);
  } catch (error) {
    console.error("Error parsing user details:", error);
    return null;
  }
};

const userDetails = getUserDetails();
const userId = userDetails ? userDetails.user?.user_id : null;

export const getOrderLength = async () => {
  if (!userId) {
    console.error("User ID is null. Make sure the user is logged in.");
    return 0; // Return 0 if no user ID is found
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${baseUrl}/api/v1/order/my-order/${userId}`);

    // Ensure response structure before accessing data
    const orderData = response.data?.data ? [response.data.data] : [];
    return orderData.length; // Return the number of orders
  } catch (error) {
    console.error("Error fetching order:", error.message);
    return 0; // Return 0 in case of an error
  }
};


export const getUserId = () => {
  try {
    const authData = getUserDetails();
    return authData?.user?.user_id || null;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
};

export const fetchUserById = async (userId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await axios.get(`${baseUrl}/api/v1/auth/get-user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error.response?.data || error.message);
    throw error;
  }
};


export const getUserData = async () => {
  try {
    const userId = getUserId();
    if (!userId) return null;
    return await fetchUserById(userId);
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};
