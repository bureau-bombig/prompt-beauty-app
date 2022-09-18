async function convertMarkdown() {
  const { marked } = await import(/* webpackChunkName: "marked" */ "marked");
  const { default: DOMPurify } = await import(/* webpackChunkName: "dompurify" */ "dompurify");

  console.log("marked", marked);
  console.log("DOMPurify", DOMPurify);

  const markdowns = document.querySelectorAll(".bb_markdown_content span");
  if (!markdowns) {
    return;
  }
  markdowns.forEach((markdown) => {
    const html = marked(markdown.textContent);
    markdown.innerHTML = DOMPurify.sanitize(html);
  });
}

export default convertMarkdown;
