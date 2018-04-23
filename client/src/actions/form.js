import axios from "axios";
import uuidv1 from "uuid/v1"

export function updateForm(data) {
  return {
    type: "UPDATE_FORM",
    data: data
  };
}

export function submitForm(formData) {
  return dispatch => {
    const refId = uuidv1();

    // add a new artwork but set to pending
    dispatch({
      type: "ADD_PENDING_ARTWORK",
      refId: refId,
      title: formData.title,
      imgUrl: formData.uploadedFileCloudinaryUrl,
    });

    const artwork = {
      title: formData.title,
      imgUrl: formData.uploadedFileCloudinaryUrl,
    };

    // make post to database
    axios
      .post("/api/work", artwork)
      .then(res => {
        // on success update artwork with new DB id 
        // TODO add date created
        dispatch({
          type: "ADD_ARTWORK_RECIEVED",
          data: { 
            id: res.data.data.id,
            refId: refId,
            dateCreated: res.data.data.dateCreated,
            isUpdating: false,
          }
        });
      })
      .catch(err => {
        // on error remove pending artwork
        // TODO add error message
        dispatch({
          type: "REMOVE_PENDING_ARTWORK"
        });
      });

    // clear form
    dispatch({
        type: "CLEAR_FORM"
    });
  };
}
