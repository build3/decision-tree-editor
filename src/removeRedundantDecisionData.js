function removeRedundantDecisionsData(processedDecisions) {
  return processedDecisions.map(({
    decisions, error, collapsed, ...otherProperties
  }) => ({
    ...otherProperties,
    ...(decisions && decisions.length > 0
      ? { decisions: removeRedundantDecisionsData(decisions) }
      : {}),
  }));
}

export default removeRedundantDecisionsData;
