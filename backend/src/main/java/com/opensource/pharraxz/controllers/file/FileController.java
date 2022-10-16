package com.opensource.pharraxz.controllers.file;

import com.opensource.pharraxz.services.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadFile(@RequestParam String fileNameWithPath) throws IOException {
        log.info("Download requested for file with path [{}]", fileNameWithPath);
        final File file = new File(fileNameWithPath);

        final HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename='%s'", file.getName()));
        header.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
        header.add(HttpHeaders.PRAGMA, "no-cache");
        header.add(HttpHeaders.EXPIRES, "0");

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileService.download(file).getByteArray());
    }

    @GetMapping("/list")
    public ResponseEntity<List<FileDTO>> listDirStructure(@RequestParam String path) {
        log.debug("Structure requested for path [{}]", path);
        return ResponseEntity.ok().body(fileService.list(path));
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Mono<Void> uploadFile(@RequestParam String path, @RequestPart("file") Mono<FilePart> file) {
        log.info("File with path [{}] received for upload", path);
        return file
                .flatMap(filePart -> fileService.getTransferTo(path, filePart))
                .then();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteFile(@RequestParam String path) throws IOException {
        log.info("Deletion path is [{}]", path);
        fileService.delete(path);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIoException(IOException exc) {
        log.error(String.valueOf(exc));
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                .body(String.format("IOException occurred. Message: [%s]", exc.getMessage()));
    }
}
