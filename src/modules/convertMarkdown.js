// import { marked } from "marked";
// import { sanitize } from "dompurify";

async function convertMarkdown() {
  const { default: marked } = await import("marked");
  const { default: sanitize } = await import("dompurify");
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
