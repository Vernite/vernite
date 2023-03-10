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

package dev.vernite.vernite.status;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.vernite.vernite.common.exception.ConflictStateException;
import dev.vernite.vernite.project.Project;
import dev.vernite.vernite.task.Task;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * Entity representing a status of a task in project workflow.
 */
@Data
@Entity
@NoArgsConstructor
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @PositiveOrZero(message = "status id must be non negative number")
    private long id;

    @Column(nullable = false, length = 50)
    @Size(min = 1, max = 50, message = "status name must be shorter than 50 characters")
    @NotBlank(message = "status name must contain at least one non-whitespace character")
    private String name;

    @Column(nullable = false)
    @PositiveOrZero(message = "status color must be non negative number")
    private int color;

    @Column(nullable = false)
    @PositiveOrZero(message = "status color must be non negative number")
    private int ordinal;

    @Column(nullable = false)
    private boolean isBegin;

    @Column(nullable = false)
    private boolean isFinal;

    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToOne(optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull(message = "status must belong to a project")
    private Project project;

    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(mappedBy = "status")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @NotNull(message = "status must have tasks")
    private List<Task> tasks = new ArrayList<>();

    /**
     * Default constructor for status.
     * 
     * @param name    must not be {@literal null} or empty
     * @param color   color of the status as integer
     * @param ordinal ordinal of the status
     * @param isFinal is the status final (tasks ends in this status)
     * @param isBegin is the status begin (tasks starts in this status)
     * @param project project the status belongs to; must not be {@literal null}
     */
    public Status(String name, int color, int ordinal, boolean isFinal, boolean isBegin, Project project) {
        setName(name);
        this.color = color;
        this.ordinal = ordinal;
        this.isFinal = isFinal;
        this.isBegin = isBegin;
        this.project = project;
    }

    /**
     * Constructor for status from create request.
     * 
     * @param project project the status belongs to; must not be {@literal null}
     * @param create  must not be {@literal null} and must be valid
     */
    public Status(Project project, CreateStatus create) {
        this(create.getName(), create.getColor(), create.getOrdinal(), create.getIsFinal(), create.getBegin(), project);
        if (this.isBegin() && this.isFinal()) {
            throw new ConflictStateException("status cannot be begin and final at the same time");
        }
    }

    /**
     * Update status with data from update.
     * 
     * @param update must not be {@literal null} and must be valid
     */
    public void update(UpdateStatus update) {
        if (update.getName() != null) {
            setName(update.getName());
        }
        if (update.getColor() != null) {
            setColor(update.getColor());
        }
        if (update.getOrdinal() != null) {
            setOrdinal(update.getOrdinal());
        }
        if (update.getBegin() != null) {
            setBegin(update.getBegin());
        }
        if (update.getIsFinal() != null) {
            setFinal(update.getIsFinal());
        }
        if (this.isBegin() && this.isFinal()) {
            throw new ConflictStateException("status cannot be begin and final at the same time");
        }
    }

    /**
     * Setter for name value. It performs {@link String#trim()} on its argument.
     * 
     * @param name must not be {@literal null} and have at least one non-whitespace
     *             character and less than 50 characters
     */
    public void setName(String name) {
        this.name = name.trim();
    }
}
