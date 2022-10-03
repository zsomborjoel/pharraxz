package com.opensource.pharraxz.controllers.file;

import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/files")
public class FileController {

    @GetMapping("/{fileName}")
    public Resource getFile(@PathVariable String fileName) {
        return new FileSystemResource(fileName);
    }

    @PostMapping("/import")
    public ResponseEntity<Void> importFile(@RequestParam MultipartFile file) {
        log.info("Received file [{}]", file.getOriginalFilename());


        return ResponseEntity.ok().build();
    }
}