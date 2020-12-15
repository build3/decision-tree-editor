const splitMessage = (message) => {
  const parsedDocument = new DOMParser().parseFromString(message, 'text/html');

  const childrenObject = [...parsedDocument.body.childNodes.values()].reduce(
    (accumulatedObject, child) => {
      if (child.classList.contains('message-header')) {
        return {
          ...accumulatedObject,
          header: child,
        };
      }

      if (child.tagName === 'H2') {
        return {
          ...accumulatedObject,
          title: child,
        };
      }

      return {
        ...accumulatedObject,
        others: [...accumulatedObject.others, child],
      };
    },
    {
      header: null,
      title: null,
      others: [],
    },
  );

  return {
    header: childrenObject.header ? childrenObject.header.innerText : '',
    title: childrenObject.title ? childrenObject.title.innerText : '',
    message: childrenObject.others.map(({ outerHTML }) => outerHTML).join('').replace(/^<br\s*\/{0,1}>|<br\s*\/{0,1}>$/g, ''),
  };
};

const splitDecisionsMessages = (rawDecisions) => rawDecisions.map(
  ({ message, decisions, ...otherData }) => ({
    ...otherData,
    ...splitMessage(message),
    ...(decisions
      ? { decisions: splitDecisionsMessages(decisions) }
      : {}
    ),
  }),
);

const formatImportedData = (importedData) => {
  const parsedData = JSON.parse(importedData);

  const formattedBaseData = {
    ...parsedData,
    ...splitMessage(parsedData.message),
    decisions: splitDecisionsMessages(parsedData.decisions),
  };

  return formattedBaseData;
};

export default formatImportedData;
