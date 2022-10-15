package com.opensource.pharraxz.services;

import com.opensource.pharraxz.controllers.file.FileDTO;
import com.opensource.pharraxz.exceptions.InvalidPathException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Value;
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
import java.util.Optional;

@Slf4j
@Service
public class FileService {

    @Value("${files.root}")
    private String rootDirectory;

    public ByteArrayResource download(final File file) throws IOException {
        final Path path = Paths.get(file.getAbsolutePath());
        return new ByteArrayResource(Files.readAllBytes(path));
    }

    public List<FileDTO> list(final String path) {
        return Arrays.stream(getFileList(path))
                .map(file -> FileDTO.builder()
                        .fileName(file.getName())
                        .isDirectory(file.isDirectory())
                        .build())
                .toList();
    }

    public void upload(final String path, final MultipartFile file) throws IOException {
        validateOrCratePath(path);
        file.transferTo(new File(path));
    }

    public void delete(final String path) throws IOException {
        if (!path.startsWith(rootDirectory)) {
            throw new InvalidPathException("Not starts with system required path");
        }

        final File currentFile = new File(path);
        if (currentFile.isDirectory()) {
            FileUtils.deleteDirectory(currentFile);
            log.info("[{}] deleted as a directory", currentFile);
        } else {
            FileUtils.delete(currentFile);
            log.info("[{}] deleted as a file", currentFile);
        }
    }

    private File[] getFileList(final String path) {
        return Optional.of(new File(path))
                .map(File::listFiles)
                .orElseThrow(InvalidPathException::new);
    }

    private void validateOrCratePath(final String path) {
        try {
            getFileList(path);
        } catch (InvalidPathException e) {
            log.info("File path [{}] not exists. Will be created", path);
            final boolean isFileCreated = new File(path).mkdirs();
            log.info("File creation is [{}]", isFileCreated);
        }
    }
}
