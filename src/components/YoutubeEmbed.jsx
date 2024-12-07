import React from 'react';
import PropTypes from 'prop-types';

const YoutubeEmbed = ({ embedId,className }) => (
  <div className="overflow-hidden pb-[56.25%] relative h-0">
    <iframe
      className={`top-0 left-0 h-full w-full absolute rounded-lg ${className}`}
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;