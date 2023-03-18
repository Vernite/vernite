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
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

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

import dev.vernite.vernite.common.constants.NameConstants;
import dev.vernite.vernite.user.User;

/**
 * Tests for {@link Workspace} class. Tests validation constraints, constructor
 * and custom getters/setters.
 */
class WorkspaceTests {

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
                Arguments.of(1, "Name", user),
                Arguments.of(1, "  Name  ", user));
    }

    private static Stream<UpdateWorkspace> testUpdate() {
        return Stream.of(
                new UpdateWorkspace("New name"),
                new UpdateWorkspace("  New name  "),
                new UpdateWorkspace(null));
    }

    private static Stream<Workspace> testValidationInvalid() {
        return Stream.of(
                new Workspace(1, "", user),
                new Workspace(1, "  ", user),
                new Workspace(-1, "Name", user),
                new Workspace(1, "a".repeat(NameConstants.MAX_LENGTH + 1), user));
    }

    @ParameterizedTest
    @MethodSource("testConstructor")
    void testBaseConstructor(int id, String name, User user) {
        Workspace workspace = new Workspace(id, name, user);

        assertEquals(id, workspace.getId().getId(), "Id should be equal");
        assertEquals(name.trim(), workspace.getName(), "Trimmed name should be equal");
        assertEquals(user, workspace.getUser(), "User should be equal");
    }

    @ParameterizedTest
    @MethodSource("testConstructor")
    void testCreateConstructor(int id, String name, User user) {
        Workspace workspace = new Workspace(1, user, new CreateWorkspace("Name"));

        assertEquals(id, workspace.getId().getId(), "Id should be equal");
        assertEquals(name.trim(), workspace.getName(), "Trimmed name should be equal");
        assertEquals(user, workspace.getUser(), "User should be equal");
    }

    @MethodSource
    @ParameterizedTest
    void testUpdate(UpdateWorkspace update) {
        Workspace workspace = new Workspace(1, "Name", user);
        workspace.update(update);

        String newName = update.getName() == null ? "Name" : update.getName().trim();

        assertEquals(newName, workspace.getName(), "Trimmed name should be equal");
    }

    @ParameterizedTest
    @ValueSource(strings = { "New name", "  New name  ", "" })
    void testSetName(String name) {
        Workspace workspace = new Workspace(1, "Name", user);
        workspace.setName(name);

        assertEquals(name.trim(), workspace.getName(), "Trimmed name should be equal");
    }

    @Test
    void testValidationValid() {
        assertTrue(validator.validate(new Workspace(1, "Name", user)).isEmpty(), "Workspace should be valid");
    }

    @MethodSource
    @ParameterizedTest
    void testValidationInvalid(Workspace workspace) {
        assertFalse(validator.validate(workspace).isEmpty(), "Workspace should be invalid");
    }

}
