import {API_BASE} from "./config";
export const makeUnauthenticatedPOSTRequest = async(route ,body) =>{
    try {
        const response = await fetch(API_BASE + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (err) {
        console.error("Fetch error:", err);
        return { err: true, message: "Fetch failed" };
    }
}
export const makeAuthenticatedPOSTRequest = async(route ,body) =>{
    try {
        const token = getToken();
        const response = await fetch(API_BASE + route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (err) {
        console.error("Fetch error:", err);
        return { err: true, message: "Fetch failed playlist bug" };
    }
}

export const makeAuthenticatedGETRequest = async(route) =>{
    try {
        const token = getToken();
        const response = await fetch(API_BASE + route, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        });

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (err) {
        console.error("Fetch error:", err);
        return { err: true, message: "Fetch failed" };
    }
}

const getToken = () => {
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  if (match) {
    return match[1];  // The token value
  }
  return null;  // Token not found
};
