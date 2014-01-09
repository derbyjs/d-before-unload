module.exports = BeforeUnload;
function BeforeUnload() {}
BeforeUnload.prototype.name = 'd-before-unload';

BeforeUnload.prototype.create = function(model, dom) {
  dom.on('beforeunload', window, function(e) {
    if (!model.hasPending()) return;
    var confirmationMessage = model.get('message') ||
      'You have unsaved changes. Do you want to leave this page and discard your changes?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  });
};
