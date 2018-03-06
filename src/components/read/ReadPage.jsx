import React from 'react';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

const urlRead = () => 'http://localhost:3000/rest/article/all'

class ReadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headingNames : [],
            contentmap: new Map(),
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

    componentDidMount() {
        fetch(urlRead())
            .then(response => response.json())
            .then(data => {
                //let obj = JSON.parse(response);
                let headinglist = [];
                let bodylist = new Map();
                for (let i =0; i<data.length; i++) {
                    headinglist.push(data[i].heading);
                    bodylist.set(data[i].heading, data[i].body);
                }
                this.setState({
                    headingNames: headinglist,
                    contentmap: bodylist
                });
            })
    }

    render() {
        return (
            <div>
                <Link to="/create"> Click here to create </Link>
                <h1> Read an Article </h1>
                <ul>
                    {this.state.headingNames.map((names) =>
                    <li key={names}>
                    <Link to="/" onClick={this.openModal.bind(this, names)}> {names} </Link>
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
                    <p>{this.state.contentmap.get(this.state.currentheading)}</p>
                </Modal>

            </div>
        );
    }
}

export default ReadPage;