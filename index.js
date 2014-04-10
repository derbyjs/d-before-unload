module.exports = BeforeUnload;
function BeforeUnload() {}
BeforeUnload.prototype.name = 'd-before-unload';

BeforeUnload.prototype.create = function(model, dom) {
  // Don't do anything until the user makes some kind of mutation
  model.root.once('all', '**', function() {
    // Thereafter, stop the user from leaving the page whenever a change might be pending
    dom.on('beforeunload', window, listenerFn(model));
  });
};

function listenerFn(model) {
  return function beforeunloadListener(e) {
    if (!model.hasPending()) return;
    var confirmationMessage = model.get('message') ||
      'You have unsaved changes. Do you want to leave this page and discard your changes?';
    e.returnValue = confirmationMessage;
    return confirmationMessage;
  };
}
