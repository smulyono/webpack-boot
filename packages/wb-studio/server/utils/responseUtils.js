
class ResponseUtils {
    writeSSEHeader(res) {
        res.writeHead(200, {
            "Content-Type" : "text/event-stream",
            "Cache-Control" : "no-cache",
            "Connection" : "keep-alive"
        });
    }
    writeSSEEvent(res, output) {
        res.write(`event: ${output} \n`);
    }
    writeSSEData(res, output) {
        res.write(`data: ${output} \n\n`);
    }
    writeSSEEndData(res, output) {
        res.end(`${output}`);
    }
}

export default new ResponseUtils();