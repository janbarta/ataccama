import React from 'react';
import ReactDOM from 'react-dom';
import DataService from './dataService.js';
import _ from 'lodash';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.items = DataService.getData();
    }

    render() {
        return (
            <ItemTable items={this.items}></ItemTable>
        );
    }
}

class ItemTable extends React.Component {

    constructor(props) {
        super(props);

        this.items = props.items;
    }

    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <ItemHead items={this.items}></ItemHead>
                </thead>
                <tbody>
                    {this.renderBody(this.items)}
                </tbody>
            </table>
        );
    }

    renderBody(items) {
        if (_.isArray(items)) {
            return this.items.map(this.renderItem);
        } else {
            return this.renderItem(items);
        }
    }

    renderItem(item) {
        return (
            <ItemRow item={item} key={item['Identification number']}></ItemRow>
        );
    }
}

class ItemHead extends React.Component {

    constructor(props) {
        super(props);

        this.items = props.items;
    }

    render() {
        if (_.isArray(this.items)) {
            return (
                <tr>
                    {_.keys(this.items[0]).map(this.renderColumn)}
                    <th>Delete</th>
                </tr>
                );
        } else {
            return (
                <tr>
                    {_.keys(this.items).map(this.renderColumn)}
                    <th>Delete</th>
                </tr>
            );
        }

    }

    renderColumn(property) {
        return (
            <th>{property}</th>
        )
    }
}

class ItemRow extends React.Component {

    constructor(props) {
        super(props);

        this.item = props.item;
        this.id = props.id;
    }

    render() {
        return (
            <tr>
                {_.values(this.item).map(this.renderColumn)}
                <td><a onClick={this.deleteItem.bind(this, this)}>Delete</a></td>
            </tr>
        );
    }

    deleteItem(self) {
        console.log(`Delete: ${self}`);
    }

    renderColumn(property) {

        if (_.isObject(property)) {
            return (
                <td>
                    <ItemTable items={property}></ItemTable>
                </td>
            )
        } else {
            return (
                <td>{property}</td>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));