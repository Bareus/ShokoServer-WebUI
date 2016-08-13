import React, { PropTypes } from 'react';

class ImportFoldersItem extends React.Component {
  static propTypes = {
    ImportFolderLocation: PropTypes.string,
    index: PropTypes.number,
  };

  render() {
    const { index, ImportFolderLocation } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{ImportFolderLocation}</td>
      </tr>
    );
  }
}

export default ImportFoldersItem;