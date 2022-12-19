import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here
    const date = Date().toString();
    const data = {
    imageUrl,
    captions,
    secret,
    createdAt: date,
    updatedAt: date,
    }
    fetch("https://gallery-app-server.vercel.app/photos", {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", //type data yang akan dikirim
      },
      body: JSON.stringify(data), // data yang dikirim
    })
    .then((response) => response.json())
    .then((data) => { 
      console.log(data);
      navigate('/photos');
      if (secret !== "password") {
        return setError('You are not authorized');
      }
    })

    .catch((error) => {
      console.log(error);
      setError(data.error);
    });
    
  };

  return (
    <>
      <div className="container">
      {error && <div className="error-msg">{error}</div>}
        <form className="add-form"  onSubmit={addPhoto}>
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>
          <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
