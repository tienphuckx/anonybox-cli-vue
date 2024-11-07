const API_HOST = "http://localhost:8080";

// Function to handle the API call for creating a room
export async function createRoomService(payload, x_user_code) {
  try {
    const response = await fetch(`${API_HOST}/v1/add-user-group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-code": x_user_code
      },
      body: JSON.stringify(payload),
    });

    // If the response is not OK, handle the error message appropriately
    if (!response.ok) {
      const contentType = response.headers.get("Content-Type");
      
      // Check if response is JSON; if not, treat it as text
      let errorMessage;
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
      } else {
        errorMessage = await response.text();
      }

      throw new Error(errorMessage);
    }

    // Parse and return the response data if the request was successful
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating room:", error.message);
    throw error; // Re-throw the error to be handled by the calling function or component
  }
}
