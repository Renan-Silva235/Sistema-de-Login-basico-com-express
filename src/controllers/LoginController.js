import Users from "../models/usersModel"

class LoginController{

    renderPageLogin(request, response){
    response.render("index");
    }

    async login(request, response){
        try{
            const users = new Users(request.body);
            await users.login();

            if(users.errors.length > 0){
                request.flash("errors", login.errors);

                const backPage = request.get("Referer") || "/login";
                request.session.save(() => {
                    return response.redirect(backPage);
                });
                return;
            }

            request.flash("success", "Login Realizado com sucesso.");
            request.session.user = users.user;
            const backPage = request.get("Referer") || "/login";
            request.session.save(() => {
                return response.redirect(backPage);
            });
        }catch (e){
            console.log(e)
            return response.render("includes/errors/403")
        };
    }
}


export default new LoginController();
