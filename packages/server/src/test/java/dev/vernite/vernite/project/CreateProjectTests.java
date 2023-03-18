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

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.stream.Stream;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import dev.vernite.vernite.common.constants.DescriptionConstants;
import dev.vernite.vernite.common.constants.NameConstants;

/**
 * Tests for {@link CreateProject} class. Tests validation constraints.
 */
class CreateProjectTests {

    private static Validator validator;

    @BeforeAll
    static void init() {
        final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    private static Stream<CreateProject> testValidationValid() {
        return Stream.of(
                new CreateProject("Name", "Description", 1L),
                new CreateProject("  Name ", " ", 4L),
                new CreateProject("  Name ", " Description", 73L));
    }

    private static Stream<CreateProject> testValidationInvalid() {
        return Stream.of(
                new CreateProject(),
                new CreateProject("Name", null, 1L),
                new CreateProject("Name", "", -1L),
                new CreateProject("", null, 1L),
                new CreateProject("a".repeat(NameConstants.MAX_LENGTH + 1), "", 1L),
                new CreateProject("Name", "a".repeat(DescriptionConstants.MAX_LENGTH + 1), 1L));
    }

    @MethodSource
    @ParameterizedTest
    void testValidationValid(CreateProject create) {
        assertTrue(validator.validate(create).isEmpty(), "Validation failed for " + create);
    }

    @MethodSource
    @ParameterizedTest
    void testValidationInvalid(CreateProject create) {
        assertFalse(validator.validate(create).isEmpty(), "Validation passed for " + create);
    }

}
