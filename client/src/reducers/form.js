
function initialDate() {
    const currentDate = new Date();
    return {
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
        year: currentDate.getFullYear()
    };
}

export default function reducer(
    state = {
        title: "",
        uploadedFileCloudinaryUrl: "",
        isUploadingImage: false,
        dateCreated: initialDate(),
        uploadedFile: null
    },
    action
) {
    switch (action.type) {
        case "UPDATE_FORM": {
            return {
                ...state,
                ...action.data,
                dateCreated: {
                    ...state.dateCreated,
                    ...action.data.dateCreated
                }
            }
        }
        case "UPDATE_TITLE": {
            return {
                ...state,
                title: action.data.title
            }
        }
        case "UPDATE_FILE_URL": {
            return {
                ...state,
                uploadedFileCloudinaryUrl: action.data.uploadedFileCloudinaryUrl,
            }
        }
        case "CLEAR_FORM": {
            return {
                title: "",
                uploadedFileCloudinaryUrl: "",
                isUploadingImage: false,
                dateCreated: initialDate(),
                uploadedFile: null
            };
        }
        default: {
            return state;
        }
    }
}
