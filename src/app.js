import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { createStore } from 'redux'

import dataReducer from './dataReducer'


let dataStore = createStore(dataReducer);

class App extends React.Component {

    constructor(props) {
        super(props);

        this.items = dataStore.getState();
    }

    render() {
        return (
            <ItemTable items={this.items}></ItemTable>
        );
    }

    componentDidMount() {
        this.unsubscribe = dataStore.subscribe(() =>  {
            this.setState({
                items: (dataStore.getState())
            });
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

//TODO: split into separate files
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
        this.headerItems = []
    }

    render() {
        if (_.isArray(this.items)) {
            return (
                <tr>
                    <!-- TODO: get keys from all items, not only first -->
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
                <td><a onClick={this.deleteItem.bind(this, this.item)}>Delete</a></td>
            </tr>
        );
    }

    deleteItem(item) {
        console.log(`Delete: ${self}`);
        dataStore.dispatch({type: 'DELETE', item: item});
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