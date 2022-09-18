import { marked } from "marked";
import { sanitize } from "dompurify";

function convertMarkdown() {
  const markdowns = document.querySelectorAll(".bb_markdown_content span");
  if (!markdowns) {
    return;
  }
  markdowns.forEach((markdown) => {
    const html = marked(markdown.textContent);
    markdown.innerHTML = sanitize(html);
  });
}

export default convertMarkdown;
