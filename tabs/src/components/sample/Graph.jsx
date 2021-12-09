import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGraph } from "./lib/useGraph";
import { ProfileCard } from "./ProfileCard";
import './Welcome.css';

export function Graph() {
  const { loading, error, data, reload } = useGraph(
    async (graph) => {
      const profile = await graph.api("/me").get();
      let photoUrl = "";
      try {
        const photo = await graph.api("/me/photo/$value").get();
        photoUrl = URL.createObjectURL(photo);
      } catch {
        // Could not fetch photo from user's profile, return empty string as placeholder.
      }
      return { profile, photoUrl };
    },
    { scope: ["User.Read"] }
  );

  return (
    <>
      <button className="btn btn-danger signIn" disabled={loading} onClick={reload}>SignIn</button>
      {!loading && error && (
        <div className="error">
          Failed to read your profile. Please try again later. <br /> Details: {error.toString()}
        </div>
      )}
      {!loading && data && ProfileCard(false, data)}
    </>
  );
}
