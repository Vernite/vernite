package com.workflow.workflow.task;

import java.util.Date;
import java.util.Optional;

import com.workflow.workflow.status.Status;

public class TaskRequest {

    private Optional<String> name;
    // private Integer sprint;
    private Optional<String> description;
    private Optional<Long> statusId;
    private Optional<Long> assigneeId;
    private Optional<Integer> type;
    private Optional<Date> deadline;
    private Optional<Date> estimatedDate;
    private Optional<Boolean> createIssue = Optional.of(true);
    private Optional<Long> parentTaskId;

    public TaskRequest() {
    }

    public TaskRequest(String name, String description, Status status, Integer type, Date deadline, Date estimatedDate) {
        this.name = Optional.of(name);
        this.description = Optional.of(description);
        this.statusId = Optional.of(status.getId());
        this.type = Optional.of(type);
        this.deadline = Optional.of(deadline);
        this.estimatedDate = Optional.of(estimatedDate);
    }

    public Optional<String> getName() {
        return name;
    }

    public void setName(String name) {
        this.name = Optional.of(name);
    }

    // public Integer getSprint() {
    //     return sprint;
    // }

    // public void setSprint(Integer sprint) {
    //     this.sprint = sprint;
    // }

    public Optional<String> getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = Optional.of(description);
    }

    public Optional<Date> getEstimatedDate() {
        return estimatedDate;
    }

    public void setEstimatedDate(Date estimatedDate) {
        this.estimatedDate = Optional.of(estimatedDate);
    }

    public Optional<Long> getStatusId() {
        return statusId;
    }

    public void setStatusId(Long statusId) {
        this.statusId = Optional.of(statusId);
    }

    public Optional<Integer> getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = Optional.of(type);
    }

    public Optional<Date> getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = Optional.of(deadline);
    }

    public Optional<Boolean> getCreateIssue() {
        return createIssue;
    }

    public void setCreateIssue(boolean createIssue) {
        this.createIssue = Optional.of(createIssue);
    }

    public Optional<Long> getParentTaskId() {
        return parentTaskId;
    }

    public void setParentTaskId(Long parentTaskId) {
        this.parentTaskId = Optional.of(parentTaskId);
    }

    public Optional<Long> getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assignee) {
        this.assigneeId = Optional.of(assignee);
    }
}
