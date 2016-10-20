import { List, Map as $Map } from 'immutable';
const debug = require('debug')('unleash:feature-store');


import {
    ADD_FEATURE_TOGGLE,
    RECEIVE_FEATURE_TOGGLES,
    UPDATE_FEATURE_TOGGLE,
} from './feature-actions';


const features = (state = new List([]), action) => {
    switch (action.type) {
        case ADD_FEATURE_TOGGLE:
            debug(ADD_FEATURE_TOGGLE, action);
            return state.push(new $Map(action.featureToggle));
        case UPDATE_FEATURE_TOGGLE:
            debug(UPDATE_FEATURE_TOGGLE, action);
            return state.map(toggle => {
                if (toggle.get('name') === action.featureToggle.name) {
                    return new $Map(action.featureToggle);
                } else {
                    return toggle;
                }
            });
        case RECEIVE_FEATURE_TOGGLES:
            debug(RECEIVE_FEATURE_TOGGLES, action);
            return new List(action.featureToggles.map($Map));
        default:
            return state;
    }
};

export default features;