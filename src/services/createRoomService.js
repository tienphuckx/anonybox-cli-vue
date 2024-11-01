// src/services/createRoomService.js

// Define the base URL for the API
const API_HOST = "http://localhost:8080";

// Function to handle the API call for creating a room
export async function createRoomService(payload) {
  try {
    const response = await fetch(`${API_HOST}/add-user-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}
