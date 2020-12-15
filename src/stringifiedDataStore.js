import { debounce } from 'debounce';
import { writable } from 'svelte/store';

import removeRedundantDecisionsData from './removeRedundantDecisionData.js';
import formatMessage from './formatMessage.js';

const formatDecisionsMessages = (rawDecisions) => rawDecisions.map(
  ({
    header, title, message, decisions, ...otherData
  }) => ({
    ...otherData,
    message: formatMessage({ header, title, message }),
    ...(decisions
      ? { decisions: formatDecisionsMessages(decisions) }
      : {}
    ),
  }),
);

const createStringifiedData = () => {
  const { subscribe, set } = writable('');

  return {
    subscribe,
    debouncedSet: debounce(({
      error, header, title, message, decisions, ...otherData
    }) => set(JSON.stringify(
      {
        ...otherData,
        message: formatMessage({ header, title, message }),
        decisions: removeRedundantDecisionsData(formatDecisionsMessages(decisions)),
      },
      null,
      2,
    )), 250),
  };
};

const stringifiedData = createStringifiedData();

export default stringifiedData;
