
class ResponseUtils {
    writeSSEHeader(res) {
        res.writeHead(200, {
            "Content-Type" : "text/event-stream",
            "Cache-Control" : "no-cache",
            "Connection" : "keep-alive"
        });
    }
    writeData(res, output) {
        res.write(`data: ${output} \n\n`);
    }
    writeEndData(res, output) {
        res.end(`${output}`);
    }
}

export default new ResponseUtils();