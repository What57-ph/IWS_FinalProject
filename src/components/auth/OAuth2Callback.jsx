import { useEffect } from "react"

const OAuth2Callback = () => {

  useEffect(() => {
    const queryString = window.location.search.substring(1);
    try {
      const decodedData = decodeURIComponent(queryString);
      console.log(decodedData);

      const authData = JSON.parse(decodedData);
      console.log(authData);


      if (window.opener) {
        window.opener.postMessage(authData, 'http://localhost:5173');
        window.close();
      }
    } catch (error) {
      console.error("Error processing OAuth callback ", error);
    }
  }, [])

  return null;
}
export default OAuth2Callback