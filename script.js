(() => {
  const $inputTextarea = document.querySelector("#input");
  const $tokenList = document.querySelector("#tokens");
  const $outputTextarea = document.querySelector("#output");

  let tokenMap = {};

  const replaceAllTokens = () => {
    let output = $inputTextarea.value;

    Object.keys(tokenMap).forEach((token) => {
      if (tokenMap[token].replacementText) {
        output = output.replace(
          new RegExp(token, "g"),
          tokenMap[token].replacementText
        );
      }
    });

    $outputTextarea.value = output;
    textAreaAdjust($outputTextarea);
  };

  const findTokens = () => {
    tokenMap = {};
    const tokenMatches = $inputTextarea.value.matchAll(/{{.+?}}/g);
    for (const match of tokenMatches) {
      if (tokenMap[match[0]]) {
        tokenMap[match[0]].occurrences++;
      } else {
        tokenMap[match[0]] = { replacementText: "", occurrences: 1 };
      }
    }

    $tokenList.innerHTML = "";
    Object.keys(tokenMap).forEach((token, i) => {
      const $li = document.createElement("li");
      const $code = document.createElement("code");
      const $label = document.createElement("label");
      const $tokenInput = document.createElement("input");
      const $occurrences = document.createElement("small");

      const occ = tokenMap[token].occurrences;
      $occurrences.innerText = `${occ} ${
        occ === 1 ? "occurrence" : "occurrences"
      }`;

      const id = `token-${i}`;
      $label.setAttribute("for", id);
      $tokenInput.setAttribute("id", id);

      $code.innerText = token;
      $label.appendChild($code);
      $tokenInput.value = tokenMap[token].replacementText;

      $tokenInput.addEventListener("input", () => {
        tokenMap[token].replacementText = $tokenInput.value;
        replaceAllTokens();
      });

      $li.appendChild($label);
      $li.appendChild($tokenInput);
      $li.appendChild($occurrences);
      $tokenList.appendChild($li);
    });
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
