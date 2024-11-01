// src/services/joinRoomService.js

const API_HOST = "http://localhost:8080";

export async function joinRoomService(payload) {
  try {
    const response = await fetch(`${API_HOST}/join-group`, {
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
    console.error("Error joining room:", error);
    throw error;
  }
}
