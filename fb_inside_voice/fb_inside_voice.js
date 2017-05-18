(function(){
  var init = function(){
    var shush = function(fragment) {
      fragment.querySelectorAll('.userContent > div[style*=background-]').forEach(function(noisyElement){
        var content = noisyElement.children[0].children[1].innerHTML;
        var container = noisyElement.parentElement;
        container.innerHTML = `<p>${content}</p>`;
        container.querySelectorAll('img[src*="/emoji.php/"]').forEach(function(emoji){
          emoji.width = 16;
          emoji.height = 16;
        });
      });
    }

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(addedNode){
          shush(addedNode);
        });
      });
    });

    var feedContainer = document.querySelectorAll('#content_container, #recent_capsule_container')[0];
    observer.observe(feedContainer, {childList: true, subtree: true});

    shush(document);
  }

  if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
  ) {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
