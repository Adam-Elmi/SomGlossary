(() => {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest("#copy-btn") as HTMLButtonElement;

    if (!btn) return;

    const container = btn.closest(".code-block-container");
    if (!container) return;

    const codeElement = container.querySelector("pre, code, .somglossary-text, #code-block-container") as HTMLElement;
    if (!codeElement) return;

    const textToCopy = codeElement.innerText;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        showFeedback(btn);
      }).catch(err => {
        console.error("Failed to copy!", err);
        fallbackCopy(textToCopy, btn);
      });
    } else {
      fallbackCopy(textToCopy, btn);
    }
  });

  function showFeedback(btn: HTMLButtonElement) {
    const tooltip = btn.querySelector("span[class*='absolute']");
    const originalText = tooltip ? tooltip.textContent : "Copy";

    if (tooltip) {
      tooltip.textContent = "Copied!";
      tooltip.classList.add("!opacity-100", "!text-emerald-400");

      setTimeout(() => {
        tooltip.textContent = originalText;
        tooltip.classList.remove("!opacity-100", "!text-emerald-400");
      }, 2000);
    }

    const icon = btn.querySelector("span[class*='text-[#8b949e]']");
    if (icon) {
      icon.classList.add("text-emerald-500");
      setTimeout(() => icon.classList.remove("text-emerald-500"), 2000);
    }
  }

  function fallbackCopy(text: string, btn: HTMLButtonElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showFeedback(btn);
    } catch (err) {
      console.error("Fallback copy failed", err);
    }
    document.body.removeChild(textArea);
  }
})();
