export const getErrorMessage = ({ response, message }) => {
  return typeof response?.data == 'string'? response.data : 
        typeof response?.data?.message == 'string' ? response.data.message : message
}
