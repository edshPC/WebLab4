package edsh.weblab4.rest;

import edsh.weblab4.bean.CheckHitBean;
import edsh.weblab4.bean.InputBean;
import edsh.weblab4.bean.ResultsBean;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.ext.Provider;

import java.util.LinkedList;

@Provider
@Path("/")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CheckHitResourse {

    @EJB
    private ResultsBean results;
    @EJB
    private CheckHitBean checkHitBean;

    @GET
    @Path("/results")
    public LinkedList<CheckHitBean> getResults() {
        return results.getResults();
    }

    @POST
    @Path("/check")
    public CheckHitBean newResult(InputBean input) {
        checkHitBean.makeCheckHit(input);
        return checkHitBean;
    }

    @GET
    @Path("/clear")
    public boolean clearResults() {
        results.clearResults();
        return true;
    }

}