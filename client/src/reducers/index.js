
export default function reducer(
    state = {
        isFetching: false,
        fetched: false,
        artworks: [],
        error: null,
        artForm: {
          value: '',
          uploadedFileCloudinaryUrl: '',
          isUploadingImage: false,
          uploadedFile: null
        }
    },
    action
) {
    switch (action.type) {
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
            }
        }
        case "ADD_ARTWORK_RECIEVED": {
            const newState = {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            };
            return newState;
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
        case "UPDATE_FORM": {
            return {
                ...state,
                artForm: {
                    ...state.artForm,
                    ...action.data
                }
            };
        }
        case "ADD_PENDING_ARTWORK": {
            action.data = {
                title: state.artForm.value,
                imgUrl: state.artForm.uploadedFileCloudinaryUrl,
                refId: action.refId,
            }

            return {
                ...state,
                artworks: artworksReducer(action, state.artworks)
            }
        }
        case "CLEAR_FORM": {
            return {
                ...state,
                artForm: {
                  value: '',
                  uploadedFileCloudinaryUrl: '',
                  isUploadingImage: false,
                  uploadedFile: null
                }
            }
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
        case "ADD_ARTWORK_RECIEVED": {
            return artworks.map(artwork => {
                if (artwork.refId === action.data.refId) {

                    return {
                        ...artwork,
                        id: action.data.id,
                        dateCreated: action.data.dateCreated,
                        isUpdating: false
                    };
                }
                return artwork;
            });
        }

        // create a new pending artwork
        case "ADD_PENDING_ARTWORK": {
            return [
                ...artworks,
                {
                    id: null,
                    title: action.data.title,
                    dateCreated: action.data.dateCreated,
                    imgUrl: action.data.imgUrl,
                    refId: action.data.refId,
                    isUpdating: true
                }
            ]
        }

        // remove pending
        case "REMOVE_PENDING_ARTWORK": {
            return artworks.filter((artwork) => artwork.isUpdating === false)
        }
        case "REMOVE_ARTWORK": {
            return artworks.filter(artwork => {
                return artwork.id !== action.data.id;
            });
        }
        case "UPDATE_ARTWORK": {
            return artworks.map(artwork => {
                return artwork.id === action.id
                    ? Object.assign({}, artwork, action.data)
                    : artwork;
            });
        }
        default: {
            return artworks;
        }

    }
}
