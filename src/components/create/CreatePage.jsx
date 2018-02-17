import React from 'react';
import {Link} from 'react-router';

class CreatePage extends React.Component {
    render() {
        return (
            <div>
                <h1> Create an Article </h1>
                <table>
                    <tr>
                        <td><label> ID </label></td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td><label> Tag </label></td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td><label> Topic </label></td>
                        <td><input type="text" /></td>
                    </tr>
                    <tr>
                        <td><label> Body </label></td>
                        <td><input type="text" /></td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default CreatePage;