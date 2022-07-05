const initialState = {
    form: {
        title: '',
        body: '',
        image: '',
    },
    imgPreview: null
}

const createBlogReducer = (state = initialState, action) => {
    if(action.type === 'SET_FORM_DATA') {
        return {
            ...state,
            // bisa jadi yang dikirimkan hanya title, atau lainya saja
            // maka digunakan spread operator
            form: {
                // copy form lama
                ...state.form,
                // formType = jenis form yang dirubah
                // formValue = valuenya
                [action.formType]: action.formValue
            }
        }
    }
    if(action.type === 'SET_IMG_PREVIEW'){
        return {
            ...state,
            imgPreview: action.payload
        }
    }
    return state;
}

export default createBlogReducer;