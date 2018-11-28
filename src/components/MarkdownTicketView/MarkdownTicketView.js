import React from 'react';
import showdown from 'showdown';

const MarkdownTicketView = ({ content }) => {
  const converter = new showdown.Converter({
    strikethrough: true,
    tasklists: true,
    tables: true,
    ghMentions: true,
    emoji: true,
  });
  const html = converter.makeHtml(content);
  return (
    <div
      className="ep-md-ticket-view"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownTicketView;
