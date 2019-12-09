import React, { useEffect, useState, useCallback } from "react";

import logo from "./logo.svg";
import "./App.css";

const LIFF_ID = "1467527063-PVMv135N";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState();

  const inifLiff = useCallback(async () => {
    setLoading(true);
    await liff.init({
      liffId: LIFF_ID
    });
    if (liff.isLoggedIn()) {
      setProfile(await liff.getProfile());
    } else {
      if (process.env.NODE_ENV === "production") {
        liff.login();
      } else {
        liff.login({
          redirectUri: "http://localhost:3000"
        });
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    inifLiff();
  }, []);

  console.log("profile", profile);

  return (
    <div className="App">
      {loading && <p>Loading...</p>}

      <header className="App-header">
        <h1>{profile && profile.displayName}</h1>
        <img src={profile && profile.pictureUrl} />
      </header>
    </div>
  );
};

export default App;
