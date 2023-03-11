/*
 * BSD 2-Clause License
 *
 * Copyright (c) 2022, [Aleksandra Serba, Marcin Czerniak, Bartosz Wawrzyniak, Adrian Antkowiak]
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

import java.util.List;
import java.util.Optional;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import dev.vernite.vernite.common.constants.IDConstants;
import dev.vernite.vernite.common.constants.NameConstants;
import dev.vernite.vernite.common.constants.NullMessages;
import dev.vernite.vernite.project.Project;
import dev.vernite.vernite.projectworkspace.ProjectWorkspace;
import dev.vernite.vernite.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Where;

/**
 * Entity for representing collection of projects.
 * Its connected to user and has unique id for that user.
 */
@Data
@Entity
@NoArgsConstructor
public final class Workspace {

    @Valid
    @EmbeddedId
    @JsonUnwrapped
    @NotNull(message = IDConstants.NULL_MESSAGE)
    private WorkspaceId id;

    @NotBlank(message = NameConstants.BLANK_MESSAGE)
    @Column(nullable = false, length = NameConstants.MAX_LENGTH)
    @Size(min = NameConstants.MIN_LENGTH, max = NameConstants.MAX_LENGTH, message = NameConstants.SIZE_MESSAGE)
    private String name;

    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(optional = false)
    @MapsId("userId")
    private User user;

    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OnDelete(action = OnDeleteAction.CASCADE)
    @OneToMany(mappedBy = "workspace")
    private List<ProjectWorkspace> projectWorkspaces = List.of();

    @ManyToMany
    @ToString.Exclude
    @OrderBy("name, id")
    @EqualsAndHashCode.Exclude
    @Where(clause = "active is null")
    @NotNull(message = NullMessages.PROJECT)
    @JoinTable(name = "project_workspace", joinColumns = {
            @JoinColumn(name = "workspace_user_id", referencedColumnName = "user_id"),
            @JoinColumn(name = "workspace_id", referencedColumnName = "id"),
    }, inverseJoinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"))
    private Set<Project> projects = Set.of();

    /**
     * Default constructor.
     *
     * @param id   unique to user positive number for new workspace
     * @param name name for new workspace
     * @param user owner of new workspace
     */
    public Workspace(long id, String name, User user) {
        this.setId(new WorkspaceId(id, user.getId()));
        this.setName(name);
        this.setUser(user);
    }

    /**
     * Constructor from create request.
     *
     * @param id     unique to user positive number for new workspace
     * @param user   owner of new workspace
     * @param create body of create request
     */
    public Workspace(long id, User user, CreateWorkspace create) {
        this(id, create.getName(), user);
    }

    /**
     * Updates workspace with data from update.
     *
     * @param update body of update request
     */
    public void update(UpdateWorkspace update) {
        Optional.ofNullable(update.getName()).ifPresent(this::setName);
    }

    /**
     * Setter for name value. It performs {@link String#trim()} on its argument.
     *
     * @param name new name value
     */
    public void setName(String name) {
        this.name = name.trim();
    }

}
