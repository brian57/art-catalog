import axios from "axios";

export function fetchArtwork() { 
    return (dispatch) => {
        dispatch({type: "FETCH_ARTWORKS"})

        axios.get("/api/work")
          .then((res) => {
            console.log(res);
            dispatch({
                type: "RECIEVED_ARTWORKS",
                artworks: res.data
            });
          }) 
          .catch((err) => {
            dispatch({
                type: "FETCH_ARTWORKS_ERROR",
                err: err
            });
          });
    }
}

export function removeArtwork(id) {
    return (dispatch) => {
        dispatch({
            type: "UPDATE_ARTWORK",
            data: {id: id, isUpdating: true}
        });
        axios
            .delete("/api/work/" + id)
            .then(res => {
                dispatch({
                    type: "REMOVE_ARTWORK",
                    data: {id: id}
                })
            })
            .catch(err => {
                dispatch({
                    type: "UPDATE_ARTWORK",
                    data: {id: id, isUpdating: false}
                });
                console.log(err);
            });
    };
}

export function updateArtwork(artwork) {
    return {
        type: "UPDATE_ARTWORK",
        data: artwork,
    }
}
