package com.opensource.pharraxz.services;

import com.opensource.pharraxz.controllers.file.FileDTO;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class FileService {

    public ByteArrayResource download(final File file) throws IOException {
        final Path path = Paths.get(file.getAbsolutePath());
        return new ByteArrayResource(Files.readAllBytes(path));
    }

    public List<FileDTO> list(final String path) {
        return Arrays.stream(Objects.requireNonNull(new File(path).listFiles()))
                .map(file -> FileDTO.builder()
                        .fileName(file.getName())
                        .isDirectory(file.isDirectory())
                        .build())
                .toList();
    }

    public void upload(final String path, final MultipartFile file) throws IOException {
        file.transferTo(new File(path));
    }
}
