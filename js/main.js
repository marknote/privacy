window.handleMath=()=> {
  const node = document.getElementsByTagName('article')[0];
  const mathInline = node.getElementsByClassName('math-inline');
  const hasMath =
    mathInline.length + node.getElementsByClassName('math-block').length > 0;
  if (hasMath) {
    Array.from(mathInline).forEach((item) => handleMathLine(item));
    renderMath(node, node);
  }
};
window.highlightFormat =()=>{
  
  hljs.highlightAll();
  const options = {   // optional
           // contentSelector: "#ArticleBody",
           // CSS class(es) used to render the copy icon.
           copyIconClass: "fas fa-copy",
           imageIconClass: "fas fa-image",
           // CSS class(es) used to render the done icon.
           checkIconClass: "fas fa-check text-success"
  };
  window.highlightJsBadge(options);
};

function loadContent(content) {
    if(window.loadContentHandler){
        clearTimeout(loadContentHandler);
    }
    window.loadContentHandler = setTimeout(function(){
        proceedLoadContent(content);
    }, 100);
}

function proceedLoadContent(content) {
  try {
      const articleList = document.getElementsByTagName('article');
      const exist = articleList.length > 0;
      if (exist) {
          const node = articleList[0];
          const nodeV = node.cloneNode(true);

          node.innerHTML = content;
          node.querySelectorAll('.mindmap').forEach(item=>{
              const itemId = item.id || hashCode(item.innerHTML);
              const found = nodeV.querySelector('#svg-'+itemId);
                  if (found) {
                      const parentNode = item.parentElement;
                      parentNode.replaceChild(found.cloneNode(true), item);
                  } else {
                  fastRender(item);
              }
          });
      }
      window.renderAll();
  } catch (err) {
    console.log(err);
    return 'ERROR';
  }
}

function highlightSearch(term) {
    // wait so not to break mermaid rendering etc
    setTimeout(()=>{
        const myHilitor = new Hilitor('post-content');
        myHilitor.apply(term);
        
    }, 1000);
}



function locateAnchorName(anchor) {
  const element = document.getElementsByName(anchor)[0];
  if (element) {
    element.scrollIntoView();
  }
}

function locateAnchorId(anchorId) {
  const element = document.getElementById(anchorId);
  if (element) {
    element.scrollIntoView();
  }
}

function triggerCheck(str) {
  if (element.checked) {
    window.location = 'triggerCheck:' + str;
  } else {
    window.location = 'triggerUnCheck:' + str;
  }
}

function triggerCheckGFM(str, element) {
  if (element.checked) {
    window.location = 'triggerCheckGFM:' + str;
  } else {
    window.location = 'triggerUnCheckGFM:' + str;
  }
}

function initMermaid() {
  const theme = localStorage.getItem('mermaidTheme') || 'default';
  mermaid.initialize({ theme, startOnLoad: true });
  mermaid.parseError = function (err, hash) {
    console.log(err);
  };
}

window.renderAll = ()=>{

    if (window.handleMath) {
        try {
            window.handleMath();
        } catch {}
    }

    if (window.highlightFormat) {
        try {
        window.highlightFormat();
        } catch {}
    }
    if (window.mermaidHandler) {
        
        clearTimeout(mermaidHandler);
    }
    window.mermaidHandler = setTimeout(function(){
       
        const mermaidNodes = document.getElementsByClassName('mermaid');
   
        if (mermaidNodes.length > 0) {
            initMermaid();
            mermaid.init({}, mermaidNodes);
        }
   }, 100);
};
