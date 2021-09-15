(function () {
  const CARD_LABEL_ATTR = 'data-card-filter';
  const ESTIMATE_TITLE_CLASS = 'title-estimate';
  function updateColumn() {
    const columns = [...document.querySelectorAll('div.project-column')];
    for (let column of columns) {
      const title = column.querySelector('button.column-menu-item');
      const QUERY_SELECTOR = `button[${CARD_LABEL_ATTR}*="Estimate:"]`;
      const labels = [...column.querySelectorAll(QUERY_SELECTOR)];

      const estimateCount = labels.map(l => +(!l.closest(".issue-card.d-none") ? l.getAttribute(CARD_LABEL_ATTR).match(/\d+/)[0] : 0)).reduce((sum, w) => sum + w, 0);
      let estimateElement = title.querySelector(`.${ESTIMATE_TITLE_CLASS}`);

      if (estimateCount === 0) {
        if (estimateElement) {
          estimateElement.remove();
        }
        continue;
      }

      if (!estimateElement) {
        estimateElement = labels[0].cloneNode(true);
        estimateElement.classList.add(ESTIMATE_TITLE_CLASS);
        estimateElement.setAttribute(CARD_LABEL_ATTR, '');
        estimateElement = title.appendChild(estimateElement);
      }

      const MINUTES_PER_HOUR = 60;
      let hoursText = estimateCount / MINUTES_PER_HOUR + " hours";
      // It's not pretty, but alas...
      if (estimateCount === MINUTES_PER_HOUR) hoursText = "1 hour";
      const newText = `${estimateCount} min (${hoursText})`;
      const currentText = estimateElement.innerHTML;
      if (newText !== currentText) {
        estimateElement.innerHTML = newText;
      }
    }
  }

  updateColumn();
  setInterval(updateColumn, 200);
})();
