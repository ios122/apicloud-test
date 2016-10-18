'use babel';

import ApicloudTestView from './apicloud-test-view';
import { CompositeDisposable } from 'atom';

export default {

  apicloudTestView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.apicloudTestView = new ApicloudTestView(state.apicloudTestViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.apicloudTestView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'apicloud-test:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.apicloudTestView.destroy();
  },

  serialize() {
    return {
      apicloudTestViewState: this.apicloudTestView.serialize()
    };
  },

  toggle() {
    console.log('ApicloudTest was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
