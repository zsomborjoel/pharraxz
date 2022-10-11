package com.opensource.pharraxz.controllers.file;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileDTO {
    private String fileName;
    private boolean isDirectory;
}
