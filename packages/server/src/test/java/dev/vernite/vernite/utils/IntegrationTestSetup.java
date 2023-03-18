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

import java.util.Date;

import org.springframework.stereotype.Component;

import dev.vernite.vernite.project.Project;
import dev.vernite.vernite.projectworkspace.ProjectWorkspace;
import dev.vernite.vernite.status.Status;
import dev.vernite.vernite.task.Task;
import dev.vernite.vernite.user.User;
import dev.vernite.vernite.user.UserSession;
import dev.vernite.vernite.workspace.Workspace;
import lombok.Getter;

/**
 * Class containing setup for integration tests.
 */
@Getter
@Component
public class IntegrationTestSetup {

    /**
     * Class containing user and user session.
     */
    public record UserInfo(User user, UserSession userSession) {

        /**
         * @return user session token
         */
        public String getSessionToken() {
            return userSession.getSession();
        }

    }

    private DataBaseRepository dataBase;

    private UserInfo user;

    private UserInfo userNoAccess;

    private Workspace workspace;

    private Workspace workspaceEmpty;

    private Project project;

    private Project projectEmpty;

    private Task task;

    private Task taskEmpty;

    /**
     * Constructor. Creates users, workspaces, projects, tasks and saves them in
     * database.
     */
    public IntegrationTestSetup(DataBaseRepository dataBase) {
        this.dataBase = dataBase;

        var user = dataBase.getUser()
                .save(new User("John", "Smith", "john_smith", "john_smith@examle.com", "password"));
        var userSession = new UserSession();
        userSession.setIp("127.0.0.1");
        userSession.setSession("user_session_john");
        userSession.setLastUsed(new Date());
        userSession.setRemembered(true);
        userSession.setUserAgent("userAgent");
        userSession.setUser(user);

        this.user = new UserInfo(user, dataBase.getUserSession().save(userSession));

        user = dataBase.getUser()
                .save(new User("Will", "Johnson", "will_johnson", "will_johnson@examle.com", "password"));
        userSession = new UserSession();
        userSession.setIp("127.0.0.1");
        userSession.setSession("user_session_will");
        userSession.setLastUsed(new Date());
        userSession.setRemembered(true);
        userSession.setUserAgent("userAgent");
        userSession.setUser(user);

        userNoAccess = new UserInfo(user, dataBase.getUserSession().save(userSession));

        user = this.user.user();

        workspace = dataBase.getWorkspace().save(new Workspace(1, "Work", user));
        workspaceEmpty = dataBase.getWorkspace().save(new Workspace(2, "Hobby", user));

        project = dataBase.getProject().save(new Project("Vernite", "Vernite application"));
        var status = dataBase.getStatus().save(new Status("Begin", 0, 0, false, true, project));
        var statusEnd = dataBase.getStatus().save(new Status("Final", 0, 1, true, false, project));

        projectEmpty = dataBase.getProject().save(new Project("Workflow", "Workflow application"));

        dataBase.getProjectWorkspace().save(new ProjectWorkspace(project, workspace, 1L));

        task = dataBase.getTask().save(new Task(1, "First", "", status, user, 0, "low"));
        taskEmpty = dataBase.getTask().save(new Task(2, "Second", "", statusEnd, user, 0, "low"));
    }

}
