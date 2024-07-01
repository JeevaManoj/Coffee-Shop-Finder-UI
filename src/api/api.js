import axios from 'axios';

// Base URL for API call

const API = axios.create({
  baseURL: "https://coffee-shop-finder-4xdf.onrender.com",
});

// Get all products

export const fetchProducts = () => API.get('/products');

// Get all products for a particular store

export const fetchProductsByStoreId = async (storeId) => {
  try {
    const response = await API.get(`/products/productByStoreId/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

// Get all stores

export const fetchStores = async (params = {}) => {
  try {
    const response = await API.get('/stores', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

// Get Store Details of a particular store

export const fetchStore = async (storeId) => {
  try {
    const response = await API.get(`/stores/store/${storeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};