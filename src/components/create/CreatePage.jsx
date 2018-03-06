import React from 'react';
import {Link} from 'react-router-dom';

const urlWrite = () => 'http://localhost:3000/rest/article/create'

const formstyle = {display: 'inline-block', width: 50, textalign: 'right', verticalAlign: 'top'}

class CreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            tag:[],
            topic:'',
            body:''
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handletag = this.handletag.bind(this);
    }

    handletag(value) {
        return value.split(',');
    }

  handleChange(event) {
      const name = event.target.name;
      let value = '';
      if(name === 'tag') {
         value = this.handletag(event.target.value);
      } else {
       value = event.target.value;
      }
    
    this.setState({
        [name]: value
    });
  }

  handleSubmit(event) {
    fetch(urlWrite(), {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
    body: JSON.stringify({
    id: this.state.id,
    tag: this.state.tag,
    heading:this.state.topic,
    body:this.state.body
  })
}).then(() => {
    window.alert("successful save");
    this.setState({
        id: '',
        tag: [],
        topic: '',
        body: ''
    }); 
    });
    event.preventDefault();
  }

    render() {
        return (
            <div>
                <Link to="/"> Read articles </Link>
                <h1> Create an Article </h1>
                <form onSubmit={this.handleSubmit}>
                <label style={formstyle}> 
                    ID: 
                </label>
                    <input name='id' type="text" value={this.state.id} onChange={this.handleChange} />
                <br />
                <label style={formstyle}> 
                    Tag: 
                </label>
                    <input name='tag' type="text" value={this.state.tag} onChange={this.handleChange} />
                <br />
                <label style={formstyle}> 
                    Topic: 
                </label>
                    <input name='topic' type="text" value={this.state.topic} onChange={this.handleChange} />
                <br />
                <label style={formstyle}> 
                    Body: 
                    </label>
                <textarea name='body' style={{height:200, width:500}} type="text" value={this.state.body} onChange={this.handleChange} />
                <br />
                <input type='submit' value='Create' />
                </form>
            </div>
        );
    }
}

export default CreatePage;