(function () {
  function hideSuggestedTextBlocks(article) {
    if (article.innerText === 'Suggested' || article.innerText.includes('Expert answers on')) {
      let outerWrapper = article.closest('.feed-shared-update-v2.feed-shared-update-v2--minimal-padding.full-height.relative');
      if (outerWrapper) {
        outerWrapper.style.display = 'none';
      }
    }
  }

  let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        hideSuggestedTextBlocks(entry.target);
      }
    });
  });

  let suggestedTextBlocks = Array.from(document.getElementsByClassName('update-components-text-view break-words'));

  suggestedTextBlocks.forEach(article => {
    observer.observe(article);
  });

  let mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1 && node.classList.contains('update-components-text-view') && node.classList.contains('break-words')) {
          observer.observe(node);
        }
      });
    });
  });

  mutationObserver.observe(document.body, { childList: true, subtree: true });
})();