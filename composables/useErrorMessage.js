export const useErrorMessage = ({ response, message }) => {
    return response?.status == 422? response.data.message : message
}