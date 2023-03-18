/*
 * BSD 2-Clause License
 *
 * Copyright (c) 2023, [Aleksandra Serba, Marcin Czerniak, Bartosz Wawrzyniak, Adrian Antkowiak]
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

package dev.vernite.vernite.project;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

import dev.vernite.vernite.common.constants.DescriptionConstants;
import dev.vernite.vernite.common.constants.NameConstants;
import dev.vernite.vernite.event.Event;
import dev.vernite.vernite.meeting.Meeting;
import dev.vernite.vernite.meeting.MeetingRepository;
import dev.vernite.vernite.projectworkspace.ProjectMember;
import dev.vernite.vernite.projectworkspace.ProjectWorkspace;
import dev.vernite.vernite.projectworkspace.ProjectWorkspaceKey;
import dev.vernite.vernite.release.Release;
import dev.vernite.vernite.release.ReleaseRepository;
import dev.vernite.vernite.sprint.Sprint;
import dev.vernite.vernite.sprint.SprintRepository;
import dev.vernite.vernite.task.Task;
import dev.vernite.vernite.task.TaskRepository;
import dev.vernite.vernite.task.time.TimeTrack;
import dev.vernite.vernite.user.User;
import dev.vernite.vernite.user.auth.AuthController;
import dev.vernite.vernite.utils.IntegrationTestSetup;
import dev.vernite.vernite.workspace.Workspace;
import dev.vernite.vernite.workspace.WorkspaceId;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for {@link ProjectController}
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
class ProjectControllerTests {

    @Autowired
    private WebTestClient client;

    @Autowired
    private IntegrationTestSetup setup;

    @BeforeEach
    void reset() {
        setup.getDataBase().getProject().deleteAll();
    }

    @Test
    void testCreateSuccess() {
        var project = client.post().uri("/project")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(new CreateProject("Test", "", setup.getWorkspace().getId().getId())).exchange()
                .expectStatus().isOk().expectBody(Project.class).returnResult().getResponseBody();

        assertNotNull(project, "Response should not be null");

        var result = setup.getDataBase().getProject().findByIdOrThrow(project.getId());

        assertEquals(project, result, "Project should be the same");
        assertEquals(0, result.getStatuses().size(), "Project should have no statuses");
        assertEquals(1, result.getProjectWorkspaces().size(), "Project should have one workspace");
        assertEquals(1, result.getUsers().size(), "Project should have one user");
    }

    private Stream<CreateProject> testCreateBadRequest() {
        var id = setup.getWorkspace().getId().getId();
        return Stream.of(new CreateProject(), new CreateProject("Test", "", null),
                new CreateProject(null, "", id), new CreateProject("", "", id),
                new CreateProject("a".repeat(NameConstants.MAX_LENGTH + 1), "", id),
                new CreateProject("a", "a".repeat(DescriptionConstants.MAX_LENGTH + 1), id),
                new CreateProject("Test", "", null));
    }

    @MethodSource
    @ParameterizedTest
    void testCreateBadRequest(CreateProject create) {
        client.post().uri("/project").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(create).exchange().expectStatus().isBadRequest();

        assertEquals(0, setup.getDataBase().getProject().count(), "Project should not be created");
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testCreateUnauthorized(String token) {
        client.post().uri("/project").cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    void testCreateNotFound() {
        client.post().uri("/project").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(new CreateProject("Test", "", 1000L)).exchange().expectStatus().isNotFound();
    }

    @Test
    void testGetSuccess() {
        var project = setup.getDataBase().getProject().save(new Project("Test", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange().expectStatus().isOk().expectBody(Project.class).isEqualTo(project);
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testGetUnauthorized(String token) {
        client.get().uri("/project/{id}", Long.MAX_VALUE).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();

        var project = setup.getDataBase().getProject().save(new Project("Test", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}", project.getId()).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();
    }

    @Test
    void testGetNotFound() {
        client.get().uri("/project/{id}", Long.MAX_VALUE)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();

        var project = setup.getDataBase().getProject().save(new Project("Test", ""));

        client.get().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUserNoAccess().getSessionToken())
                .exchange().expectStatus().isNotFound();
    }

    private Stream<UpdateProject> testUpdateSuccess() {
        return Stream.of(new UpdateProject(), new UpdateProject("New test", "", null),
                new UpdateProject(null, "", setup.getWorkspaceEmpty().getId().getId()));
    }

    @MethodSource
    @ParameterizedTest
    void testUpdateSuccess(UpdateProject update) {
        var project = setup.getDataBase().getProject().save(new Project("Test", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        project.update(update);

        client.put().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(update).exchange().expectStatus().isOk().expectBody(Project.class)
                .isEqualTo(project);

        assertEquals(project, setup.getDataBase().getProject().findByIdOrThrow(project.getId()),
                "Project should be updated");

        if (update.getWorkspaceId() != null) {
            assertEquals(1,
                    setup.getDataBase().getWorkspace()
                            .findById(new WorkspaceId(update.getWorkspaceId(), setup.getUser().user().getId()))
                            .orElseThrow().getProjects().size(),
                    "Workspace should have one project");
        }
    }

    private Stream<UpdateProject> testUpdateBadRequest() {
        return Stream.of(new UpdateProject("  ", "", null),
                new UpdateProject(null, "a".repeat(DescriptionConstants.MAX_LENGTH + 1), null),
                new UpdateProject("a".repeat(NameConstants.MAX_LENGTH + 1), "", null));
    }

    @MethodSource
    @ParameterizedTest
    void testUpdateBadRequest(UpdateProject update) {
        var project = setup.getDataBase().getProject().save(new Project("Test", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.put().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(update).exchange().expectStatus().isBadRequest();

        assertEquals(project, setup.getDataBase().getProject().findByIdOrThrow(project.getId()),
                "Project should not be updated");
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testUpdateUnauthorized(String token) {
        client.put().uri("/project/{id}", Long.MAX_VALUE).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();

        var project = setup.getDataBase().getProject().save(new Project("Test", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.put().uri("/project/{id}", project.getId()).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();
    }

    @Test
    void testUpdateNotFound() {
        var project = setup.getDataBase().getProject().save(new Project("Test", ""));

        client.put().uri("/project/{pId}", Long.MAX_VALUE)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(new UpdateProject(null, "", 1L)).exchange().expectStatus().isNotFound();

        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.put().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(new UpdateProject(null, "", Long.MAX_VALUE)).exchange().expectStatus().isNotFound();
    }

    @Test
    void testDeleteSuccess() {
        var project = setup.getDataBase().getProject().save(new Project("PUT", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.delete().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk();

        assertNotNull(setup.getDataBase().getProject().findById(project.getId()).get().getActive(),
                "Project should be deleted");
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testDeleteUnauthorized(String token) {
        client.delete().uri("/project/{id}", Long.MAX_VALUE).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();

        var id = setup.getDataBase().getProject().save(new Project("Test", "")).getId();

        client.delete().uri("/project/{id}", id).cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();

        assertNull(setup.getDataBase().getProject().findById(id).get().getActive(), "Project should not be deleted");
    }

    @Test
    void testDeleteNotFound() {
        client.delete().uri("/project/{id}", Long.MAX_VALUE)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange().expectStatus().isNotFound();

        var project = setup.getDataBase().getProject().save(new Project("Test", ""));

        client.delete().uri("/project/{id}", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange().expectStatus().isNotFound();
    }

    @Test
    @Deprecated
    void moveProjectWorkspaceNotFound() {
        client.put().uri("/project/{id}/workspace/1", 1024)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange()
                .expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("PUT", ""));

        client.put().uri("/project/{id}/workspace/{wId}", project.getId(), 1024)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange()
                .expectStatus().isNotFound();

        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.put().uri("/project/{id}/workspace/{wId}", project.getId(), 1024)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    @Deprecated
    void getProjectMembersSuccess() {
        Project project = setup.getDataBase().getProject().save(new Project("PROJECT", ""));
        var ps = setup.getDataBase().getProjectWorkspace()
                .save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(ProjectMember.class).hasSize(1).contains(ps.getProjectMember());
    }

    @Test
    @Deprecated
    void getProjectMembersUnauthorized() {
        client.get().uri("/project/1/member").exchange().expectStatus().isUnauthorized();

        Project project = setup.getDataBase().getProject().save(new Project("PROJECT", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}/member", project.getId()).exchange().expectStatus().isUnauthorized();
    }

    @Test
    @Deprecated
    void getProjectMembersNotFound() {
        client.get().uri("/project/1/member").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange()
                .expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        client.get().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }

    @Test
    @Deprecated
    void getProjectMemberSuccess() {
        Project project = setup.getDataBase().getProject().save(new Project("PROJECT", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        ProjectMember pm = client.get()
                .uri("/project/{id}/member/{memberId}", project.getId(), setup.getUser().user().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBody(ProjectMember.class).returnResult().getResponseBody();

        assertNotNull(pm);
        assertEquals(pm.user().getId(), setup.getUser().user().getId());
        assertEquals(pm.user().getUsername(), setup.getUser().user().getUsername());
    }

    @Test
    @Deprecated
    void getProjectMemberUnauthorized() {
        client.get().uri("/project/1/member/{memberId}", setup.getUser().user().getId()).exchange().expectStatus()
                .isUnauthorized();

        Project project = setup.getDataBase().getProject().save(new Project("PROJECT", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}/member/{memberId}", project.getId(), setup.getUser().user().getId()).exchange()
                .expectStatus()
                .isUnauthorized();
    }

    @Test
    @Deprecated
    void getProjectMemberNotFound() {
        client.get().uri("/project/1/member/{memberId}", setup.getUser().user().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange()
                .expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        client.get().uri("/project/{id}/member/{memberId}", project.getId(), setup.getUser().user().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();

        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));
        client.get().uri("/project/{id}/member/{memberId}", project.getId(), 0)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }

    @Test
    @Deprecated
    void addProjectMemberSuccess() {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));

        User user2 = setup.getDataBase().getUser().findByUsername("member_add_test_name");
        if (user2 == null) {
            user2 = setup.getDataBase().getUser()
                    .save(new User("1", "2", "member_add_test_name", "member_add_test@Dname", "1"));
        }

        ProjectInvite invite = new ProjectInvite();
        invite.setEmails(List.of(user2.getEmail()));
        invite.setProjects(List.of(project.getId()));

        ProjectInvite result = client.post().uri("/project/member")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).bodyValue(invite).exchange()
                .expectStatus()
                .isOk().expectBody(ProjectInvite.class).returnResult().getResponseBody();

        assertNotNull(result);
        assertEquals(0, result.getEmails().size());
        assertEquals(0, result.getProjectList().size());
        assertEquals(true, setup.getDataBase().getProjectWorkspace()
                .findById(new ProjectWorkspaceKey(new Workspace(0, "inbox", user2), project)).isEmpty());

        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));
        result = client.post().uri("/project/member")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(invite).exchange().expectStatus().isOk().expectBody(ProjectInvite.class).returnResult()
                .getResponseBody();
        assertNotNull(result);
        assertEquals(true, setup.getDataBase().getProjectWorkspace()
                .findById(new ProjectWorkspaceKey(new Workspace(0, "inbox", user2), project)).isPresent());
        assertEquals(1, result.getEmails().size());
        assertEquals(1, result.getProjectList().size());
        assertEquals("member_add_test_name", result.getEmails().get(0));
        assertEquals(project.getId(), result.getProjectList().get(0).getId());

        result = client.post().uri("/project/member")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(invite).exchange().expectStatus().isOk().expectBody(ProjectInvite.class).returnResult()
                .getResponseBody();
        assertNotNull(result);

        assertEquals(true, setup.getDataBase().getProjectWorkspace()
                .findById(new ProjectWorkspaceKey(new Workspace(0, "inbox", user2), project)).isPresent());
        assertEquals(1, result.getEmails().size());
        assertEquals(1, result.getProjectList().size());

        invite.setEmails(null);

        result = client.post().uri("/project/member")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(invite).exchange().expectStatus().isOk().expectBody(ProjectInvite.class).returnResult()
                .getResponseBody();
        assertNotNull(result);
        assertEquals(0, result.getEmails().size());
        assertEquals(0, result.getProjectList().size());

        invite.setProjects(null);

        result = client.post().uri("/project/member")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(invite).exchange().expectStatus().isOk().expectBody(ProjectInvite.class).returnResult()
                .getResponseBody();
        assertNotNull(result);
        assertEquals(0, result.getEmails().size());
        assertEquals(0, result.getProjectList().size());
    }

    @Test
    @Deprecated
    void addProjectMemberUnauthorized() {
        client.post().uri("/project/member").exchange().expectStatus().isUnauthorized();
    }

    @Test
    @Deprecated
    void deleteMemberSuccess() {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        User user2 = setup.getDataBase().getUser().findByUsername("member_add_test_name");
        if (user2 == null) {
            user2 = setup.getDataBase().getUser()
                    .save(new User("1", "2", "member_add_test_name", "member_add_test@Dname", "1"));
        }
        Workspace workspace2 = setup.getDataBase().getWorkspace().save(new Workspace(1, "test", user2));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, workspace2, 2L));

        List<User> result = client.put().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(List.of(user2.getId(), 666, 54, setup.getUser().user().getId())).exchange().expectStatus()
                .isOk()
                .expectBodyList(User.class).returnResult().getResponseBody();
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(user2.getName(), result.get(0).getName());
        assertEquals(user2.getId(), result.get(0).getId());
        assertEquals(false,
                setup.getDataBase().getProjectWorkspace().findById(new ProjectWorkspaceKey(workspace2, project))
                        .isPresent());
        assertEquals(true,
                setup.getDataBase().getProjectWorkspace()
                        .findById(new ProjectWorkspaceKey(setup.getWorkspace(), project))
                        .isPresent());
    }

    @Test
    @Deprecated
    void deleteMemberUnauthorized() {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));

        client.put().uri("/project/{id}/member", project.getId()).bodyValue(List.of()).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    @Deprecated
    void deleteProjectMemberForbidden() {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 2L));

        client.put().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).bodyValue(List.of()).exchange()
                .expectStatus()
                .isForbidden();
    }

    @Test
    @Deprecated
    void deleteProjectMemberNotFound() {
        client.put().uri("/project/666/member").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(List.of()).exchange().expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        client.put().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(List.of()).exchange().expectStatus().isNotFound();
    }

    @Test
    @Deprecated
    void leaveProjectSuccess() {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        ProjectWorkspace pw = setup.getDataBase().getProjectWorkspace()
                .save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.delete().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk();
        assertEquals(false, setup.getDataBase().getProjectWorkspace().findById(pw.getId()).isPresent());
    }

    @Test
    @Deprecated
    void leaveProjectUnauthorized() {
        client.delete().uri("/project/1/member").exchange().expectStatus().isUnauthorized();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        client.delete().uri("/project/{id}/member", project.getId()).exchange().expectStatus().isUnauthorized();
    }

    @Test
    @Deprecated
    void leaveProjectNotFound() {
        client.delete().uri("/project/666/member").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange()
                .expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));

        client.delete().uri("/project/{id}/member", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }

    @Test
    @Deprecated
    void getTimeTracksSuccess(@Autowired TaskRepository taskRepository) {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER"));
        Task task = taskRepository
                .save(new Task(1, "n", "d", project.getStatuses().get(0), setup.getUser().user(), 1, "low"));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}/track", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(TimeTrack.class).hasSize(0);

        setup.getDataBase().getTimeTrack().save(new TimeTrack(setup.getUser().user(), task));

        client.get().uri("/project/{id}/track", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(TimeTrack.class).hasSize(1);
    }

    @Test
    @Deprecated
    void getTimeTracksUnauthorized() {
        client.get().uri("/project/1/track").exchange().expectStatus().isUnauthorized();
    }

    @Test
    @Deprecated
    void getTimeTracksNotFound() {
        client.get().uri("/project/666/track").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange().expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        client.get().uri("/project/{id}/track", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }

    @Test
    @Deprecated
    void getEventsSuccess(@Autowired TaskRepository taskRepository, @Autowired MeetingRepository meetingRepository,
            @Autowired SprintRepository sprintRepository, @Autowired ReleaseRepository releaseRepository) {
        Project project = setup.getDataBase().getProject().save(new Project("MEMBER"));
        Task task = taskRepository
                .save(new Task(1, "n", "d", project.getStatuses().get(0), setup.getUser().user(), 1, "low"));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, setup.getWorkspace(), 1L));

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(0);

        task.setDeadline(new Date(2));
        taskRepository.save(task);

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(1);

        meetingRepository.save(new Meeting(project, "1", "1", new Date(3), new Date(1001)));

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(2);

        meetingRepository.save(new Meeting(project, "1", "1", new Date(2001), new Date(3032)));

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(2);

        task.setDeadline(new Date(3000));
        taskRepository.save(task);

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(1);

        sprintRepository.save(new Sprint("n", new Date(1), new Date(1000), Sprint.Status.CREATED, "d", project));
        sprintRepository.save(new Sprint("n", new Date(2000), new Date(3000), Sprint.Status.CREATED, "d", project));

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(2);

        Release release = new Release("Name", "description", new Date(500), project);
        releaseRepository.save(release);

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(3);

        client.get().uri("/project/{id}/events?from=1&to=1000&type=0", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(1);

        task.setEstimatedDate(new Date(100));
        taskRepository.save(task);

        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Event.class).hasSize(4);
    }

    @Test
    @Deprecated
    void getEventsUnauthorized() {
        client.get().uri("/project/1/events?from=1&to=1000").exchange().expectStatus().isUnauthorized();
    }

    @Test
    @Deprecated
    void getTEventsNotFound() {
        client.get().uri("/project/666/events?from=1&to=1000")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .exchange().expectStatus().isNotFound();

        Project project = setup.getDataBase().getProject().save(new Project("MEMBER", ""));
        client.get().uri("/project/{id}/events?from=1&to=1000", project.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }
}
