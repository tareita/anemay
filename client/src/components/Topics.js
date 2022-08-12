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
      <ul className="list-group">
        {topics.map((topic) => (
          <Topic topic={topic} />
        ))}
      </ul>
    </div>
  );
};

export default Topics;
