// src/services/chatRoomService.js

const API_BASE_URL = "http://localhost:8080";


// src/services/chatRoomService.js
export async function sendMessageToServer(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/send-msg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is in JSON format
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      // If the response is not OK, try to read the text
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    // Parse JSON if the content type is correct
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      throw new Error("Expected JSON response, but received different format");
    }
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}


export async function fetchListGroups(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/gr/list/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching groups: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


/**
 * Fetch the messages for a specific contact.
 * @param {string} contactId - The ID of the contact to fetch messages for.
 * @returns {Promise<Array>} A promise that resolves to an array of message objects.
 */
export async function fetchMessages(contactId) {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}/messages`);
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function fetchGroupDetails(groupId) {
    try {
        if(!groupId){
            groupId = 13; 
        }
      const response = await fetch(`${API_BASE_URL}/group-detail/${groupId}`);
      if (!response.ok) {
        throw new Error(`Error fetching group details: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }