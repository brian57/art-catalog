export default function artworks(
    state = {
        isFetching: false,
        fetched: false,
        artworks: [],
        cardWidth: 200,
        error: ""
    },
    action
) {
    switch (action.type) {
        case "EDIT_CARD_WIDTH": {
            return { ...state, cardWidth: action.value };
        }
        case "FETCH_ARTWORKS": {
            return { ...state, isFetching: true };
        }
        case "FETCH_ARTWORKS_ERROR": {
            return { ...state, isFetching: false, error: action.errorMsg };
        }
        case "RECIEVED_ARTWORKS": {
            return {
                ...state,
                isFetching: false,
                artworks: artworksReducer(action, action.artworks)
            };
        }
        case "UPDATE_PENDING_ARTWORK": {
            return {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            };
        }
        // remove pending
        case "REMOVE_PENDING_ARTWORK": {
            const newState = {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            };
            return newState;
        }
        case "REMOVE_ARTWORK": {
            return {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            };
        }
        case "UPDATE_ARTWORK": {
            return {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            };
        }

        case "ADD_ARTWORK": {
            return {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            };
        }
        default: {
            return state;
        }
    }
}

// reducer for the artworks array prop
function artworksReducer(action, artworks) {
    switch (action.type) {
        case "RECIEVED_ARTWORKS": {
            return action.artworks.map(artwork => {
                artwork.isUpdating = false;
                return artwork;
            });
        }
        case "UPDATE_PENDING_ARTWORK": {
            return artworks.map(artwork => {
                if (artwork.refId === action.data.refId) {
                    return {
                        ...artwork,
                        ...action.data
                    };
                }
                return artwork;
            });
        }
        
        case "ADD_ARTWORK": {
            return [...artworks, action.data];
        }

        // remove pending
        case "REMOVE_PENDING_ARTWORK": {
            return artworks.filter(
                artwork =>
                    artwork.isUpdating === false &&
                    artwork.refId === action.data.refId
            );
        }
        case "REMOVE_ARTWORK": {
            return artworks.filter(artwork => {
                return artwork.id !== action.data.id;
            });
        }
        case "UPDATE_ARTWORK": {
            return artworks.map(artwork => {
                return artwork.id === action.data.id
                    ? Object.assign({}, artwork, action.data)
                    : artwork;
            });
        }
        default: {
            return artworks;
        }
    }
}
