
function initialState() {
    const currentDate = new Date();

    return {
        title: "",
        id: null,
        category: "none",
        uploadedFileCloudinaryUrl: "",
        isUploadingImage: false,
        dateCreated: {
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
            year: currentDate.getFullYear()
        },
        uploadedFile: null
    }
}

export default function reducer(
    state = initialState(),
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
            return initialState()
        }
        default: {
            return state;
        }
    }
}
