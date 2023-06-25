window.MathJax = {
  startup: {
    pageReady: function () {

      window.renderMathInput = function (input, output) {
        if (input && input.value) {
          output.innerText = input.value.trim();
        } else {
          output.innerText = input.innerText.trim();
        }
        MathJax.typesetPromise([output])
          .catch(function (err) {
            output.appendChild(document.createTextNode(err.message));
            console.error(err);
          });
      };
      window.renderMath = function (node) {
        MathJax.typesetPromise([node])
          .catch(function (err) {
            node.appendChild(document.createTextNode(err.message));
            console.error(err);
          });
      };

      return MathJax.startup.defaultPageReady();
    },
  },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
    processEscapes: true,
  },
};

window.typesetInput = function () {
  var input = document.getElementById('MathInput');
  var output = document.getElementById('MathPreview');
  if (input && output) {
    window.renderMathInput(input, output);
    input.oninput = typesetInput;
  }
};

function handleMathLine(block) {
  try {
    block.innerText = '$ ' + block.innerText + ' $';
  } catch (error) {
    console.error(error);
  }
}
setTimeout(window.typesetInput, 200);
