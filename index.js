module.exports = BeforeUnload;
function BeforeUnload() {}
BeforeUnload.prototype.view = __dirname;

BeforeUnload.prototype.create = function(model) {
  function onBeforeUnload(e) {
    if (!model.hasPending()) return;
    var confirmationMessage = model.get('message') ||
      'You have unsaved changes. Do you want to leave this page and discard your changes?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  }
  if (window.addEventListener) {
    window.addEventListener('beforeunload', onBeforeUnload, false);
  } else {
    window.onbeforeunload = onBeforeUnload;
  }
};
