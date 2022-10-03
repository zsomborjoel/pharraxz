package com.opensource.pharraxz.controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/files")
public class FileController {

    @GetMapping("/{fileName}")
    public Resource getFile(@PathVariable String fileName) {
        Resource resource = new FileSystemResource(fileName);
        return resource;
    }
}