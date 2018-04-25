import axios from "axios";
import uuidv1 from "uuid/v1";

export function updateForm(data) {
  return {
    type: "UPDATE_FORM",
    data: data
  };
}

export function clearForm() {
  return {
    type: "CLEAR_FORM"
  };
}

export function createArtwork(formData) {
  return dispatch => {
    const refId = uuidv1();

    let artwork = {
      ...getArtworkObjFromForm(formData),
      isUpdating: true,
      refId: refId,
      id: null
    }

    // add a new artwork with "isUpdating" set to true
    dispatch({
      type: "ADD_ARTWORK",
      data: artwork,
    });

    axios.post("/api/work", artwork)
      .then(res => {

        // on success update artwork with new DB id and set isUpdating to false
        artwork.isUpdating = false
        artwork.id = res.data.data.id;

        dispatch({
          type: "UPDATE_PENDING_ARTWORK",
          data: artwork
        });
      })
      .catch(err => {
        // on error remove pending artwork

        // TODO add error message
        console.log(err);

        dispatch({
          type: "REMOVE_PENDING_ARTWORK",
          data: artwork
        });
      });

    // clear form
    dispatch({
      type: "CLEAR_FORM"
    });
  };

}

export function updateArtwork(formData) {
  return dispatch => {

    let artwork = getArtworkObjFromForm(formData);

    dispatch({
      type: "UPDATE_ARTWORK",
      data: { id: artwork.id, isUpdating: true }
    });


    axios.put("/api/work/" + formData.id, artwork)
      .then(res => {
        // on success update artwork with new data
        artwork.isUpdating = false;
        dispatch({
          type: "UPDATE_ARTWORK",
          data: artwork,
        });
      })
      .catch(err => {
        // TODO add error message
        console.log(err);
      });

    // clear form
    dispatch({
      type: "CLEAR_FORM"
    });
  };
  
}

// convert form data into artwork object
function getArtworkObjFromForm(formData) {
    return {
      ...formData,
      dateCreated: getDateString(formData.dateCreated),
      imgUrl: formData.uploadedFileCloudinaryUrl,
      isUpdating: true,
    };
}

function getDateString(dateObj) {
    return dateObj.year + "-" + dateObj.month + "-" + dateObj.day;
}