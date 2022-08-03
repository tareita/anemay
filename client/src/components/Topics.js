import React from "react";
import Topic from "./Topic";

const Topics = () => {
  const topics = [
    "Updates",
    "Anime",
    "Manga",
    "Movies",
    "Games",
    "Music",
    "Off-topic",
  ];
  return (
    <div>
      <h3 className="my-3">Topics</h3>
      <ul className="list-group list-group-flush">
        {topics.map((topic) => (
          <Topic topic={topic} />
        ))}
      </ul>
    </div>
  );
};

export default Topics;
