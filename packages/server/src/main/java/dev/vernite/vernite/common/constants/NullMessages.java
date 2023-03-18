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

package dev.vernite.vernite.common.constants;

import lombok.experimental.UtilityClass;

/**
 * Utility class containing all message keys for not null validation on database
 * relations.
 */
@UtilityClass
public class NullMessages {

    /**
     * Key for message when project is null.
     */
    public static final String PROJECT = "nullProject";

    /**
     * Key for message when workspace id is null.
     */
    public static final String WORKSPACE_ID = "nullWorkspaceId";

    /**
     * Key for message when member is null.
     */
    public static final String MEMBER = "nullMember";

    /**
     * Key for message when user is null.
     */
    public static final String USER = "nullUser";

    /**
     * Key for message when status is null.
     */
    public static final String STATUS = "nullStatus";

    /**
     * Key for message when counter is null.
     */
    public static final String COUNTER = "nullCounter";

    /**
     * Key for message when sprint is null.
     */
    public static final String SPRINT = "nullSprint";

    /**
     * Key for message when release is null.
     */
    public static final String RELEASE = "nullRelease";

    /**
     * Key for message when meeting is null.
     */
    public static final String MEETING = "nullMeeting";

}
