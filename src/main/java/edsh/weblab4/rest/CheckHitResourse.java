package edsh.weblab4.rest;

import edsh.weblab4.bean.*;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

import java.util.LinkedList;
import java.util.List;

@Provider
@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CheckHitResourse {

    @EJB
    private ResultsBean results;
    @EJB
    private CheckHitBean checkHitBean;

    @EJB
    private AuthorizationBean authorizationBean;

    @GET
    @Path("/results")
    public Response getResults(@CookieParam("token") String token) {
        AuthResultBean auth = authorizationBean.checkAuthorization(token);
        if(!auth.isSuccess()) return makeResponse(auth);

        var res = results.getResults(auth.getLogin());
        auth.setData(res);
        return makeResponse(auth);
    }

    @POST
    @Path("/check")
    public Response newResult(InputBean input, @CookieParam("token") String token) {
        AuthResultBean auth = authorizationBean.checkAuthorization(token);
        if(!auth.isSuccess()) return makeResponse(auth);

        input.setLogin(auth.getLogin());
        checkHitBean.makeCheckHit(input);
        auth.setData(checkHitBean);
        return makeResponse(auth);
    }

    @GET
    @Path("/clear")
    public Response clearResults(@CookieParam("token") String token) {
        AuthResultBean auth = authorizationBean.checkAuthorization(token);
        if(!auth.isSuccess()) return makeResponse(auth);

        results.clearResults(auth.getLogin());
        return makeResponse(auth);
    }

    private Response makeResponse(AuthResultBean authResultBean) {
        if(authResultBean.isSuccess()) {
            return Response.ok().entity(authResultBean).build();
        }
        else return Response.status(Response.Status.UNAUTHORIZED).entity(authResultBean).build();
    }


}