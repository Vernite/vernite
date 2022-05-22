package com.workflow.workflow.project;

import com.workflow.workflow.projectworkspace.ProjectWorkspace;
import com.workflow.workflow.projectworkspace.ProjectWorkspaceRepository;
import com.workflow.workflow.status.Status;
import com.workflow.workflow.status.StatusRepository;
import com.workflow.workflow.user.User;
import com.workflow.workflow.user.UserRepository;
import com.workflow.workflow.workspace.Workspace;
import com.workflow.workflow.workspace.WorkspaceKey;
import com.workflow.workflow.workspace.WorkspaceRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Deprecated
@RestController
@RequestMapping("/project")
public class ProjectControllerOld {
        @Autowired
        private ProjectRepository projectRepository;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private WorkspaceRepository workspaceRepository;
        @Autowired
        private ProjectWorkspaceRepository projectWorkspaceRepository;
        @Autowired
        private StatusRepository statusRepository;

        static final String USER_NOT_FOUND = "USER_NOT_FOUND";
        static final String PROJECT_NOT_FOUND = "project not found";
        static final String WORKSPACE_NOT_FOUND = "workspace not found";

        @Operation(summary = "Create project.", description = "This method creates new project for user in given workspace. TODO: for now all projects are created for user with id 1, later this will be based on authentication. User creating project is added as member with privileges 1. On success returns newly created project. Throws status 404 when workspace with given id does not exist. Throws status 400 when sent data are incorrect.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Newly created project.", content = {
                                        @Content(mediaType = "application/json", schema = @Schema(implementation = Project.class))
                        }),
                        @ApiResponse(responseCode = "400", description = "Bad request data format.", content = @Content()),
                        @ApiResponse(responseCode = "404", description = "Workspace with given id not found.", content = @Content())
        })
        @PostMapping("/")
        public Project add(@RequestBody ProjectRequest request) {
                User user = userRepository.findById(1L) // TODO: for now all projects are created for user with id 1
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, USER_NOT_FOUND));
                if (request.getWorkspaceId() == null) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "workspace id cannot be null");
                }
                Workspace workspace = workspaceRepository
                                .findByIdAndUser(new WorkspaceKey(request.getWorkspaceId(), user), user)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                WORKSPACE_NOT_FOUND));
                Project project = projectRepository.save(new Project(request));
                ProjectWorkspace projectWorkspace = new ProjectWorkspace(project, workspace, 1L);
                projectWorkspaceRepository.save(projectWorkspace);
                Status status = new Status();
                status.setColor(0);
                status.setFinal(false);
                status.setName("TO DO");
                status.setOrdinal(0);
                status.setProject(project);
                statusRepository.save(status);
                status = new Status();
                status.setColor(0);
                status.setFinal(false);
                status.setName("In Progress");
                status.setOrdinal(1);
                status.setProject(project);
                statusRepository.save(status);
                status = new Status();
                status.setColor(0);
                status.setFinal(true);
                status.setName("Done");
                status.setOrdinal(2);
                status.setProject(project);
                statusRepository.save(status);
                return project;
        }
}
