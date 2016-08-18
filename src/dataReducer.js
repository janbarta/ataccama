
import _ from 'lodash';

import dataService from './dataService';

let initialState = dataService.getData();

const dataReducer = (state = initialState, action) => {

        switch (action.type) {
            case "DELETE":

                var stateCopy = _.clone(state);

                findObjectProperty(stateCopy, action.item);
                return state;

            default:
                return state;

        }
};

const findObjectProperty = (object, objectToFind) => {

    if (_.isArray(object)) {
        object.forEach((arrayValue) => {
            findObjectProperty(arrayValue, objectToFind);
        });
        return;
    }

    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            return;
        }

        const value = object[prop];

        if (_.isArray(value)) {
            value.forEach((arrayValue) => {
                findObjectProperty(arrayValue, objectToFind);
            });
        }

        if (_.isEqual(value, objectToFind)) {

            //TODO: change to pure function
            delete object[prop];
            return;
        }

        if (_.isObject(value)) {
            findObjectProperty(value, objectToFind);
        }
    }
};

export default dataReducer;