(() => {
  const $inputTextarea = document.querySelector("#input");
  const $tokenList = document.querySelector("#tokens");
  const $outputTextarea = document.querySelector("#output");

  let currentTokenMap = {};

  const replaceAllTokens = () => {
    let output = $inputTextarea.value;

    Object.keys(currentTokenMap).forEach((token) => {
      if (currentTokenMap[token].replacementText) {
        output = output.replace(
          new RegExp(token, "g"),
          currentTokenMap[token].replacementText
        );
      }
    });

    $outputTextarea.value = output;
    textAreaAdjust($outputTextarea);
  };

  const findTokens = () => {
    currentTokenMap = {};
    const tokenMatches = $inputTextarea.value.matchAll(/{{.+?}}/g);
    for (const match of tokenMatches) {
      if (currentTokenMap[match[0]]) {
        currentTokenMap[match[0]].occurrences++;
      } else {
        currentTokenMap[match[0]] = { replacementText: "", occurrences: 1 };
      }
    }

    const foundTokensArr = Object.keys(currentTokenMap);
    if (foundTokensArr.length) {
      $tokenList.innerHTML = "";
      foundTokensArr.forEach((token, i) => {
        const $li = document.createElement("li");
        const $code = document.createElement("code");
        const $label = document.createElement("label");
        const $tokenInput = document.createElement("input");
        const $occurrences = document.createElement("small");

        const occ = currentTokenMap[token].occurrences;
        $occurrences.innerText = `${occ} ${
          occ === 1 ? "occurrence" : "occurrences"
        }`;

        const id = `token-${i}`;
        $label.setAttribute("for", id);
        $tokenInput.setAttribute("id", id);

        $code.innerText = token;
        $label.appendChild($code);
        $tokenInput.value = currentTokenMap[token].replacementText;

        $tokenInput.addEventListener("input", () => {
          currentTokenMap[token].replacementText = $tokenInput.value;
          replaceAllTokens();
        });

        $li.appendChild($label);
        $li.appendChild($occurrences);
        $li.appendChild($tokenInput);
        $tokenList.appendChild($li);
      });
    } else {
      $tokenList.innerHTML = "<li><small>none found</small></li>";
    }
  };

  const textAreaAdjust = (element) => {
    element.style.height = "1px";
    element.style.height = 10 + element.scrollHeight + "px";
  };

  $inputTextarea.addEventListener("input", () => {
    findTokens();
    textAreaAdjust($inputTextarea);
    $outputTextarea.value = $inputTextarea.value;
    textAreaAdjust($outputTextarea);
    localStorage.setItem("input", $inputTextarea.value);
  });

  //load previous input value or a default value
  let prevValue = localStorage.getItem("input");
  if (!prevValue) {
    prevValue = `Hello,\nMy name is {{NAME}}, I am {{AGE}} years old and I work for {{COMPANY}}.\n\nThanks,\n - {{NAME}}`;
  }
  $inputTextarea.value = prevValue;
  $inputTextarea.dispatchEvent(new KeyboardEvent("input"));
})();
