const formatMessage = ({ header, title, message }) => `${header ? `<div class="message-header">${header}</div>` : ''}${title ? `<br /><h2>${title}</h2>` : ''}${message}`;

export default formatMessage;
