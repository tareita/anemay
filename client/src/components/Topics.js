import React from "react";
import Topic from "./Topic";

const Topics = () => {
  const topics = [
    { topic: "Updates", description: "Site-related updates" },
    {
      topic: "Anime",
      description: "Suggestions and discussions, from seasonal to old but gold",
    },
    {
      topic: "Manga",
      description: "Talk about the latest chapter releases here",
    },
    {
      topic: "Games",
      description:
        "Chat about games here (please no doki doki literature club)",
    },
    {
      topic: "Movies",
      description: "Ayo, new Makoto Shinkai movie just dropped?",
    },
    { topic: "Music", description: "Post your favourite J-Pop songs" },
    { topic: "Off-topic", description: "Anything non-anime related goes here" },
  ];

  return (
    <div>
      <ul className="list-group">
        {topics.map(({ topic, description }) => (
          <Topic topic={topic} description={description} />
        ))}
      </ul>
    </div>
  );
};

export default Topics;
