class Middleware{

    globalMiddleware(request, response, next){
        response.locals.user = request.session.user;
        next();
    }

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
