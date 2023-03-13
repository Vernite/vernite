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

package dev.vernite.vernite.utils;

import org.springframework.stereotype.Component;

import dev.vernite.vernite.project.ProjectRepository;
import dev.vernite.vernite.projectworkspace.ProjectWorkspaceRepository;
import dev.vernite.vernite.release.ReleaseRepository;
import dev.vernite.vernite.sprint.SprintRepository;
import dev.vernite.vernite.status.StatusRepository;
import dev.vernite.vernite.task.TaskRepository;
import dev.vernite.vernite.task.comment.CommentRepository;
import dev.vernite.vernite.task.time.TimeTrackRepository;
import dev.vernite.vernite.user.UserRepository;
import dev.vernite.vernite.user.UserSessionRepository;
import dev.vernite.vernite.workspace.WorkspaceRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Class containing database repositories.
 */
@Getter
@Component
@AllArgsConstructor
public class DataBaseRepository {

    private UserRepository user;

    private UserSessionRepository userSession;

    private WorkspaceRepository workspace;

    private ProjectWorkspaceRepository projectWorkspace;

    private ProjectRepository project;

    private StatusRepository status;

    private TaskRepository task;

    private ReleaseRepository release;

    private SprintRepository sprint;

    private TimeTrackRepository timeTrack;

    private CommentRepository comment;

}
