import { user } from './user'
export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);
    
    if (requestBody["email"] == "info@aliranjbar.ir")
        return user
    else {
        setResponseStatus(event, 401);
        return {
            message: "اطلاعات وارد شده اشتباه می باشد.",
        };
    }
});
