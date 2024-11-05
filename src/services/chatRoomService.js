// src/services/chatRoomService.js

const API_BASE_URL = "http://localhost:8080";


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

/**
 * Send a message to a specific contact.
 * @param {string} contactId - The ID of the contact to send the message to.
 * @param {string} content - The content of the message.
 * @returns {Promise<Object>} A promise that resolves to the sent message object.
 */
export async function sendMessageToServer(contactId, content) {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${contactId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`Error sending message: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
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