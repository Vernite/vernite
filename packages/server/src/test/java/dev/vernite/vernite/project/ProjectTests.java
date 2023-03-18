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
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.stream.Stream;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;

import dev.vernite.vernite.common.constants.DescriptionConstants;
import dev.vernite.vernite.common.constants.NameConstants;
import dev.vernite.vernite.projectworkspace.ProjectWorkspace;
import dev.vernite.vernite.user.User;
import dev.vernite.vernite.workspace.Workspace;

class ProjectTests {

    private static final User user = new User("name", "surname", "username", "email", "password");
    private static Validator validator;

    @BeforeAll
    static void init() {
        user.setId(1);

        final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    private static Stream<Arguments> testConstructor() {
        return Stream.of(
                Arguments.of("Name", "Description"),
                Arguments.of("  Name  ", "  Description  "));
    }

    private static Stream<UpdateProject> testUpdate() {
        return Stream.of(
                new UpdateProject("NewName", "NewDescription", null),
                new UpdateProject("  Name ", "   Description  ", null),
                new UpdateProject());
    }

    private static Stream<Project> testValidationInvalid() {
        return Stream.of(
                new Project("", "Description"),
                new Project("  ", "Description"),
                new Project("a".repeat(NameConstants.MAX_LENGTH + 1), "Description"),
                new Project("Name", "a".repeat(DescriptionConstants.MAX_LENGTH + 1)));
    }

    @ParameterizedTest
    @MethodSource("testConstructor")
    void testBaseConstructor(String name, String description) {
        Project project = new Project(name, description);

        assertEquals(name.trim(), project.getName(), "Trimmed name should be equal");
        assertEquals(description.trim(), project.getDescription(), "Trimmed description should be equal");
        assertNotNull(project.getTaskCounter(), "Task counter should not be null");
    }

    @ParameterizedTest
    @MethodSource("testConstructor")
    void testCreateConstructor(String name, String description) {
        Project project = new Project(new CreateProject(name, description, 1L));

        assertEquals(name.trim(), project.getName(), "Trimmed name should be equal");
        assertEquals(description.trim(), project.getDescription(), "Trimmed description should be equal");
        assertNotNull(project.getTaskCounter(), "Task counter should not be null");
    }

    @MethodSource
    @ParameterizedTest
    void testUpdate(UpdateProject update) {
        Project project = new Project("Name", "Description");
        project.update(update);

        String newName = update.getName() == null ? "Name" : update.getName().trim();
        String newDescription = update.getDescription() == null ? "Description" : update.getDescription().trim();

        assertEquals(newName, project.getName(), "Trimmed name should be equal");
        assertEquals(newDescription, project.getDescription(), "Trimmed description should be equal");
    }

    @Test
    void testIsMember() {
        Project project = new Project("Name", "Description");

        assertFalse(project.isMember(user), "User should not be a member of the project");

        project.getUsers().add(user);
        project.getProjectWorkspaces().add(new ProjectWorkspace(project, new Workspace(1, "Name", user), 1L));

        assertTrue(project.isMember(user), "User should be a member of the project");
    }

    @Test
    void testRemoveMember() {
        Project project = new Project("Name", "Description");

        assertNull(project.removeMember(user), "User should not be a member of the project");

        project.getUsers().add(user);
        project.getProjectWorkspaces().add(new ProjectWorkspace(project, new Workspace(1, "Name", user), 1L));

        assertNotNull(project.removeMember(user), "User should be a member of the project");

        assertNull(project.removeMember(user), "User should not be a member of the project");
    }

    @ParameterizedTest
    @ValueSource(strings = { "New name", "  New name  ", "" })
    void testSetName(String name) {
        Project project = new Project("Name", "Description");
        project.setName(name);

        assertEquals(name.trim(), project.getName(), "Trimmed name should be equal");
    }

    @ParameterizedTest
    @ValueSource(strings = { "New description", "  New description  ", "" })
    void testSetDescription(String description) {
        Project project = new Project("Name", "Description");
        project.setDescription(description);

        assertEquals(description.trim(), project.getDescription(), "Trimmed description should be equal");
    }

    @Test
    void testValidationValid() {
        assertTrue(validator.validate(new Project("Name", "Description")).isEmpty(), "Project should be valid");
    }

    @MethodSource
    @ParameterizedTest
    void testValidationInvalid(Project project) {
        assertFalse(validator.validate(project).isEmpty(), "Project should be invalid");
    }

}
