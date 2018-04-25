import { combineReducers } from 'redux'
import artworks from "./artworks";
import form from "./form";

function showModal(state = false, action) {
    switch (action.type) {
        case "SHOW_MODAL": {
            return true;
        }
        case "HIDE_MODAL": {
            return false;
        }
        default: {
            return state;
        }
    }

}
export default combineReducers({
  artworks,
  form,
  showModal
})
