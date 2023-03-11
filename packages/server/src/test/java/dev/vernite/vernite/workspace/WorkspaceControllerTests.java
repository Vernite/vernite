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

package dev.vernite.vernite.workspace;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.stream.Stream;

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
import org.springframework.test.web.reactive.server.WebTestClient;

import dev.vernite.vernite.common.constants.NameConstants;
import dev.vernite.vernite.project.Project;
import dev.vernite.vernite.projectworkspace.ProjectWorkspace;
import dev.vernite.vernite.user.auth.AuthController;
import dev.vernite.vernite.utils.IntegrationTestSetup;

/**
 * Integration tests for {@link WorkspaceController}
 */
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(Lifecycle.PER_CLASS)
class WorkspaceControllerTests {

    private static void assertWorkspaceEquals(Workspace w1, Workspace w2) {
        assertEquals(w1.getId().getId(), w2.getId().getId(), "Workspace id should be equal");
        assertEquals(w1.getName(), w2.getName(), "Workspace name should be equal");
    }

    @Autowired
    private WebTestClient client;

    @Autowired
    private IntegrationTestSetup setup;

    @BeforeEach
    void clean() {
        setup.getDataBase().getWorkspace().deleteAll();
    }

    private Stream<List<Workspace>> testGetAllSuccess() {
        return Stream.of(new ArrayList<>(),
                new ArrayList<>(List.of(new Workspace(1, "Test 1", setup.getUser().user()),
                        new Workspace(2, "Test 3", setup.getUser().user()),
                        new Workspace(3, "Test 2", setup.getUser().user()))));
    }

    @MethodSource
    @ParameterizedTest
    void testGetAllSuccess(List<Workspace> workspaces) {
        setup.getDataBase().getWorkspace().saveAll(workspaces);
        workspaces.sort(Comparator.comparing(Workspace::getName));
        var result = client.get().uri("/workspace")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBodyList(Workspace.class).hasSize(workspaces.size()).returnResult().getResponseBody();

        assertNotNull(result, "Response should not be null");

        for (var i = 0; i < workspaces.size(); i++) {
            assertWorkspaceEquals(workspaces.get(i), result.get(i));
        }
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testGetAllUnauthorized(String token) {
        client.get().uri("/workspace").cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    void testCreateSuccess() {
        var workspace = client.post().uri("/workspace")
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(new CreateWorkspace("Test")).exchange().expectStatus().isOk().expectBody(Workspace.class)
                .returnResult().getResponseBody();

        assertNotNull(workspace, "Response should not be null");

        var optional = setup.getDataBase().getWorkspace()
                .findById(new WorkspaceId(workspace.getId().getId(), setup.getUser().user().getId()));

        assertTrue(optional.isPresent(), "Workspace should be present in database");

        var result = optional.get();

        assertWorkspaceEquals(workspace, result);
    }

    private Stream<CreateWorkspace> testCreateBadRequest() {
        return Stream.of(new CreateWorkspace(""), new CreateWorkspace(" "), new CreateWorkspace());
    }

    @MethodSource
    @ParameterizedTest
    void testCreateBadRequest(CreateWorkspace create) {
        client.post().uri("/workspace").cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken())
                .bodyValue(create).exchange().expectStatus().isBadRequest();
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testCreateUnauthorized(String token) {
        client.post().uri("/workspace").cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    void testGetSuccess() {
        var workspace = new Workspace(1, "Test", setup.getUser().user());
        setup.getDataBase().getWorkspace().save(workspace);

        var result = client.get().uri("/workspace/{id}", workspace.getId().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus().isOk()
                .expectBody(Workspace.class).returnResult().getResponseBody();

        assertNotNull(result, "Response should not be null");

        assertWorkspaceEquals(workspace, result);
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testGetUnauthorized(String token) {
        client.get().uri("/workspace/{id}", Long.MAX_VALUE).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();

        var id = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user())).getId()
                .getId();

        client.get().uri("/workspace/{id}", id).cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    void testGetNotFound() {
        client.get().uri("/workspace/{id}", Long.MAX_VALUE)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();

        var id = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user())).getId();

        client.get().uri("/workspace/{id}", id.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUserNoAccess().getSessionToken())
                .exchange().expectStatus().isNotFound();

        setup.getDataBase().getWorkspace().deleteById(id);

        client.get().uri("/workspace/{id}", id.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }

    private Stream<UpdateWorkspace> testUpdateSuccess() {
        return Stream.of(new UpdateWorkspace("Test 1"), new UpdateWorkspace("Test 2"));
    }

    @MethodSource
    @ParameterizedTest
    void testUpdateSuccess(UpdateWorkspace update) {
        var workspace = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user()));

        var result = client.put().uri("/workspace/{id}", workspace.getId().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).bodyValue(update).exchange()
                .expectStatus().isOk().expectBody(Workspace.class).returnResult().getResponseBody();

        workspace.update(update);

        assertNotNull(result, "Response should not be null");

        assertWorkspaceEquals(workspace, result);

        var optional = setup.getDataBase().getWorkspace()
                .findById(new WorkspaceId(workspace.getId().getId(), setup.getUser().user().getId()));

        assertTrue(optional.isPresent(), "Workspace should be present in database");

        result = optional.get();

        assertWorkspaceEquals(workspace, result);
    }

    private Stream<UpdateWorkspace> testUpdateBadRequest() {
        return Stream.of(new UpdateWorkspace(""), new UpdateWorkspace(" "),
                new UpdateWorkspace("a".repeat(NameConstants.MAX_LENGTH + 1)));
    }

    @MethodSource
    @ParameterizedTest
    void testUpdateBadRequest(UpdateWorkspace update) {
        var workspace = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user()));

        client.put().uri("/workspace/{id}", workspace.getId().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).bodyValue(update).exchange()
                .expectStatus().isBadRequest();
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testUpdateUnauthorized(String token) {
        client.put().uri("/workspace/{id}", Long.MAX_VALUE).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();

        var id = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user())).getId()
                .getId();

        client.put().uri("/workspace/{id}", id).cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    void testUpdateNotFound() {
        client.put().uri("/workspace/{id}", Long.MAX_VALUE)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).bodyValue(new UpdateWorkspace())
                .exchange().expectStatus().isNotFound();

        var id = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user())).getId();

        client.put().uri("/workspace/{id}", id.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUserNoAccess().getSessionToken())
                .bodyValue(new UpdateWorkspace()).exchange().expectStatus().isNotFound();

        setup.getDataBase().getWorkspace().deleteById(id);

        client.put().uri("/workspace/{id}", id.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).bodyValue(new UpdateWorkspace())
                .exchange().expectStatus().isNotFound();
    }

    @Test
    void testDeleteSuccess() {
        var workspace = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user()));

        client.delete().uri("/workspace/{id}", workspace.getId().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isOk();

        var optional = setup.getDataBase().getWorkspace()
                .findById(new WorkspaceId(workspace.getId().getId(), setup.getUser().user().getId()));

        assertTrue(optional.isEmpty(), "Workspace should not be present in database");

        var project = new Project("Vernite tests", "");
        project.setActive(new Date());
        project = setup.getDataBase().getProject().save(project);

        workspace = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user()));
        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, workspace, 1L));

        client.delete().uri("/workspace/{id}", workspace.getId().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isOk();

        optional = setup.getDataBase().getWorkspace()
                .findById(new WorkspaceId(workspace.getId().getId(), setup.getUser().user().getId()));

        assertTrue(optional.isEmpty(), "Workspace should not be present in database");
    }

    @ParameterizedTest
    @ValueSource(strings = { "invalid_token", "", " " })
    void testDeleteUnauthorized(String token) {
        client.delete().uri("/workspace/{id}", Long.MAX_VALUE).cookie(AuthController.COOKIE_NAME, token).exchange()
                .expectStatus().isUnauthorized();

        var id = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user())).getId()
                .getId();

        client.delete().uri("/workspace/{id}", id).cookie(AuthController.COOKIE_NAME, token).exchange().expectStatus()
                .isUnauthorized();
    }

    @Test
    void testDeleteNotFound() {
        client.delete().uri("/workspace/{id}", Long.MAX_VALUE)
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();

        var id = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user())).getId();

        client.delete().uri("/workspace/{id}", id.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUserNoAccess().getSessionToken()).exchange().expectStatus()
                .isNotFound();

        setup.getDataBase().getWorkspace().deleteById(id);

        client.delete().uri("/workspace/{id}", id.getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isNotFound();
    }

    @Test
    void testDeleteConflict() {
        var workspace = setup.getDataBase().getWorkspace().save(new Workspace(1, "Test", setup.getUser().user()));
        var project = setup.getDataBase().getProject().save(new Project("Vernite tests", ""));

        setup.getDataBase().getProjectWorkspace().save(new ProjectWorkspace(project, workspace, 1L));

        client.delete().uri("/workspace/{id}", workspace.getId().getId())
                .cookie(AuthController.COOKIE_NAME, setup.getUser().getSessionToken()).exchange().expectStatus()
                .isEqualTo(409);
    }

}
