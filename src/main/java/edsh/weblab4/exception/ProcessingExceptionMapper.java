package edsh.weblab4.exception;

import edsh.weblab4.bean.AuthResultBean;
import jakarta.annotation.Priority;
import jakarta.ws.rs.ProcessingException;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

@Provider
@Priority(1)
@Produces(MediaType.APPLICATION_JSON)
public class ProcessingExceptionMapper extends Throwable implements ExceptionMapper<ProcessingException> {
    @Override
    public Response toResponse(ProcessingException e) {
        var res = new AuthResultBean();
        res.setError("Invalid request parametrs");
        return Response.status(400).entity(res).build();
    }

}