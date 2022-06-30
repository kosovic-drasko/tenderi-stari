package tender.web.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import tender.service.VideoStreamService;

@RestController
@RequestMapping("/video")
public class VideoStreamController {

    private final VideoStreamService videoStreamService;

    public VideoStreamController(VideoStreamService videoStreamService) {
        this.videoStreamService = videoStreamService;
    }

    // http://localhost:8080/video/stream/mp4/toystory
    @GetMapping("/stream/{fileType}/{fileName}")
    public Mono<ResponseEntity<byte[]>> streamVideo(
        ServerHttpResponse serverHttpResponse,
        @RequestHeader(value = "Range", required = false) String httpRangeList,
        @PathVariable("fileType") String fileType,
        @PathVariable("fileName") String fileName
    ) {
        return Mono.just(videoStreamService.prepareContent(fileName, fileType, httpRangeList));
    }
}
