// import EasyMDE from "easymde";
// Embedded via unpkg only on post reource site. already loaded.

async function postResource() {
  const easyMDE = new EasyMDE({
    element: document.getElementById("bb_easymde_editor"),
    showIcons: [
      "strikethrough",
      "code",
      "table",
      "redo",
      "heading",
      "undo",
      "heading-bigger",
      "heading-smaller",
      "heading-1",
      "heading-2",
      "heading-3",
      "clean-block",
      "horizontal-rule",
    ],
    autosave: {
      enabled: true,
      delay: 1000,
      uniqueId: "mde-autosave-demo",
    },
    initialValue:
      "# EasyMDE \nGo ahead, play around with the editor! Be sure to check out **bold**, *italic* and ~~strikethrough~~ styling, [links](https://google.com) and all the other features. You can type the Markdown syntax, use the toolbar, or use shortcuts like `ctrl-b` or `cmd-b`.",
  });
  console.log("easyMDE", easyMDE);
  console.log("easyMDE.value()", easyMDE.value());
}

export default postResource;
