// src/services/joinRoomService.js

const API_HOST = "http://localhost:8080";

export async function joinRoomService(payload, router) {
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

    // Parse the JSON response
    const data = await response.json();

    // Extract user_id and user_code from the response data
    const { user_id, user_code, group_id, group_name } = data;

    console.log("DATAs:", {
      group_id,
      group_name
    });

    // Save the user_id and user_code to localStorage
    localStorage.setItem("x-user-id", user_id);
    localStorage.setItem("x-user-code", user_code);

    console.log("Saved to localStorage:", {
      user_id: localStorage.getItem("x-user-id"),
      user_code: localStorage.getItem("x-user-code")
    });

    router.push({path: "/chat-room"});
  } catch (error) {
    console.error("Error joining room:", error);
    throw error;
  }
}
