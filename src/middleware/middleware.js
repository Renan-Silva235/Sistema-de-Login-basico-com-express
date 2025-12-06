class Middleware{
    checkCsrfError(error, request, response, next){
        if(error.code == "EBADCSRFTOKEN"){
            return response.status(403).render("403");
        }
        next(error);
    }

    csrfMiddleware(request, response, next){
        response.locals.csrfToken = request.csrfToken();
        next();
    }
}

export default new Middleware();
