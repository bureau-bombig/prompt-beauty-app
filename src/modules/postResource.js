import EasyMDE from "easymde";

async function postResource() {
  const easyMDE = new EasyMDE({ element: document.getElementById("bb_easymde_editor") });
  console.log("easyMDE", easyMDE);
  console.log("easyMDE.value()", easyMDE.value());
}

export default postResource;
