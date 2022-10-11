package com.opensource.pharraxz.controllers.file;

import com.opensource.pharraxz.services.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<Resource> download(@RequestParam String fileNameWithPath) throws IOException {
        log.info("Download requested for file with path [{}]", fileNameWithPath);
        final File file = new File(fileNameWithPath);

        final HttpHeaders header = new HttpHeaders();
        header.add(HttpHeaders.CONTENT_DISPOSITION, String.format("attachment; filename=%s", file.getName()));
        header.add("Cache-Control", "no-cache, no-store, must-revalidate");
        header.add("Pragma", "no-cache");
        header.add("Expires", "0");

        return ResponseEntity.ok()
                .headers(header)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(fileService.download(file));
    }

    @GetMapping("/list")
    public ResponseEntity<List<FileDTO>> listDirStructure(@RequestParam String path) {
        log.info("Structure requested for path [{}]", path);
        return ResponseEntity.ok().body(fileService.list(path));
    }

    @PostMapping("/upload")
    public ResponseEntity<Void> uploadFile(@RequestParam String path, @RequestParam MultipartFile file) throws IOException {
        log.info("Received file [{}]", file.getOriginalFilename());
        fileService.upload(path, file);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(IOException exc) {
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(String.format("IOException occurred: %s", exc.getMessage()));
    }
}
