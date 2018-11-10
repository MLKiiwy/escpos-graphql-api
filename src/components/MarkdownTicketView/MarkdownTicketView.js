import React from 'react';
import showdown from 'showdown';

const MarkdownTicketView = ({ content }) => {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(content);
  return (
    <div
      className="ep-md-ticket-view"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownTicketView;
