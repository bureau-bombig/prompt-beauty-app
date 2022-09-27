// this trigger an update in wordpress to add currect post views to actually posts meta data additional to the additional table of the f****g plugin

async function updateViewMeta() {
  const response = await fetch("https://prompt.beauty/wp-json/promptbeauty/v1/views/update");
}

export default updateViewMeta;
