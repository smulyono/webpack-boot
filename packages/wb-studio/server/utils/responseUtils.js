import uuid from 'uuid';
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
        let id = uuid.v4();
        res.write(`id: ${id} \n`);
        res.write('event: data\n');
        res.write(`data: ${output} \n\n`);
        res.flush();
    }
    writeSSEEndData(res, output) {
        res.write('event: end\n');
        res.end(`data: ${output} \n\n`);
    }
}

export default new ResponseUtils();