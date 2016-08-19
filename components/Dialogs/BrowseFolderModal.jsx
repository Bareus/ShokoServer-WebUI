import React, { PropTypes } from 'react';
import {
  Modal,
  Panel,
  Button,
  ButtonToolbar,
} from 'react-bootstrap';
import s from './ImportModal.css';
import { setStatus, setFolder } from '../../core/actions/modals/BrowseFolder';
import store from '../../core/store';
import TreeView from '../TreeView/TreeView';

class BrowseFolderModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { folder: '' };
    this.handleClose = this.handleClose.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleClose() {
    store.dispatch(setStatus(false));
  }

  handleSelectionChange(folder) {
    this.setState({ folder });
  }

  handleSelect() {
    store.dispatch(setFolder(this.state.folder));
    store.dispatch(setStatus(false));
  }

  render() {
    const { show } = this.props;
    return (
      <Modal show={show} className={s.modal} backdrop={false} >
        <Panel header="Select import folder">
          <TreeView onSelect={this.handleSelectionChange} />
          <ButtonToolbar className="pull-right">
            <Button onClick={this.handleSelect} bsStyle="primary">Select</Button>
            <Button onClick={this.handleClose}>Cancel</Button>
          </ButtonToolbar>
        </Panel>
      </Modal>
    );
  }
}

export default BrowseFolderModal;
