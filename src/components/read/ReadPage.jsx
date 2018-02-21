import React from 'react';
import {Link} from 'react-router';

const urlRead = () => 'http://localhost:3000/rest/article/all'

class ReadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            headingNames : []
        }
    }

    componentDidMount() {
        fetch(urlRead())
            .then(response => response.json())
            .then(data => {
                //let obj = JSON.parse(response);
                let headinglist = [];
                for (let i =0; i<data.length; i++) {
                    headinglist.push(data[i].heading);
                }
                console.log(headinglist);
                this.setState({
                    headingNames: headinglist
                })
            })
    }


    render() {
        return (
            <div>
                <h1> Read an Article </h1>
                <ul>
                    {this.state.headingNames.map((names) =>
                    <li key={names}>
                    {names}
                    </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ReadPage;