import React from 'react';
import {Link} from 'react-router-dom';
import Search from '../search/SearchPage'

const searchUrl = () => 'http://localhost:3000/sup-proxy/rest/query';

class SmartSearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headingNames : [],
            contentmap: new Map(),
            searchString: '',
            smartTalkMessage: '',
            smartTalkOnly: false,
            currentpath: '/smart'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchString: event.target.value
        });
    }

    handleSubmit(event) {
        let searchUrlWithParam = searchUrl() + '?query=' + this.state.searchString;
        console.log(searchUrlWithParam);
        fetch(searchUrlWithParam)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //let obj = JSON.parse(response);
            let headinglist = [];
            let bodylist = new Map();

            if(data.length == 0) {
                this.setState({
                    smartTalkMessage: 'No results found',
                    smartTalkOnly: true
                });
            } else if(data[0].id === null) {
                this.setState({
                    smartTalkMessage: data[0].body,
                    smartTalkOnly: true
                });
                console.log(data[0].body);
            } else {
            for (let i =0; i<data.length; i++) {
                headinglist.push(data[i].heading);
                bodylist.set(data[i].heading, data[i].body);
            }
            this.setState({
                headingNames: headinglist,
                contentmap: bodylist,
                smartTalkOnly: false
            });
            console.log('inside for loop');
        }
        })

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <Link to="/"> Click here to read </Link>
                <br />
                <Link to="/create"> Click here to create </Link>
                <h1> Smart Search (Beta) </h1>
                <form onSubmit={this.handleSubmit}>
                <input name='searchString' type="text" value={this.state.searchString} onChange={this.handleChange} />
                <input type='submit' value='Search' />
                {this.state.smartTalkOnly ? (
                    <h3> {this.state.smartTalkMessage} </h3>
                ) : (
                    <Search headingNames={this.state.headingNames} contentmap={this.state.contentmap} currentpath={this.state.currentpath} />
                )}
            </form>
            </div>
        );
    }
}

export default SmartSearchPage;