import React from 'react';
import {Link} from 'react-router-dom';
import Search from '../search/SearchPage'

const urlRead = () => 'http://localhost:3000/rest/article/all';
const searchUrl = () => 'http://localhost:3000/rest/article/search';

class ReadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headingNames : [],
            contentmap: new Map(),
            searchString: ''
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
        let searchUrlWithParam = searchUrl() + '?searchString=' + this.state.searchString;
        console.log(searchUrlWithParam);
        fetch(searchUrlWithParam)
        .then(response => response.json())
        .then(data => {
            console.log(data);
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

        event.preventDefault();
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
                <form onSubmit={this.handleSubmit}>
                <input name='searchString' type="text" value={this.state.searchString} onChange={this.handleChange} />
                <input type='submit' value='Search' />
                <Search headingNames={this.state.headingNames} contentmap={this.state.contentmap} />
            </form>
            </div>
        );
    }
}

export default ReadPage;