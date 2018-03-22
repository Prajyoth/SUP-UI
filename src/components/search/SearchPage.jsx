import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentheading: '',
            modalIsOpen: false
        };
      
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal (curheading) {
        this.setState({modalIsOpen: true, currentheading: curheading});
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }

    render() {
        return (
            <div>
                 <ul>
                    {this.props.headingNames.map((names) =>
                    <li key={names}>
                    <Link to={this.props.currentpath} onClick={this.openModal.bind(this, names)}> {names} </Link>
                    </li>
                    )}
                </ul>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Article description"
                >
                    <button onClick={this.closeModal}>close</button>
                    <h2>{this.state.currentheading}</h2>
                    <p>{this.props.contentmap.get(this.state.currentheading)}</p>
                </Modal>

            </div>
        )
    }
}

export default Search;