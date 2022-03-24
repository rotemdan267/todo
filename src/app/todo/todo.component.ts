import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Task {
  name: string;
  isUpdated: boolean;
}

enum SortOptions {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none'
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Task[] = [];

  SortEnum = SortOptions;
  sorted: SortOptions = SortOptions.NONE;

  readonly TASKS_KEY = 'tasks';

  constructor() {
    this.tasks = [
      { name: 'task 1', isUpdated: false },
      { name: 'task 2', isUpdated: false },
      { name: 'task 3', isUpdated: false },
    ]
  }

  ngOnInit(): void {
    let savedTasksJson = localStorage.getItem(this.TASKS_KEY);
    if (savedTasksJson != null) {
      this.tasks = JSON.parse(savedTasksJson);
    }
  }

  handleSubmit(addForm: NgForm) {
    let newTask: Task = { name: addForm.value.task, isUpdated: false };
    this.tasks.push(newTask);
    addForm.resetForm();
  }

  handleRemove(t: string) {
    this.tasks = this.tasks.filter(myTask => myTask.name != t);
  }

  handleUpdate(t: Task) {
    t.isUpdated = true;
  }


  handleSubmitUpdate(newName: string, oldName: string) {

    let updatedTask = this.tasks.filter(t => t.name === oldName)[0];
    updatedTask.name = newName;
    updatedTask.isUpdated = false;
  }

  handleSave() {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(this.tasks));
  }

  handleSort(direction: SortOptions) {
    if (direction == this.sorted) {
      this.sorted = SortOptions.NONE;
      return;
    }

    this.sorted = direction;

    switch (direction) {
      case SortOptions.ASC:

        this.tasks = this.tasks.sort((a, b) => {
          let al = a.name.toLowerCase();
          let bl = b.name.toLowerCase();
          if (al < bl) {
            return -1;
          }
          if (al > bl) {
            return 1;
          }
          return 0;
        });

        break;

      case SortOptions.DESC:
        this.tasks = this.tasks.sort((a, b) => {
          let al = a.name.toLowerCase();
          let bl = b.name.toLowerCase();
          if (al < bl) {
            return 1;
          }
          if (al > bl) {
            return -1;
          }
          return 0;
        });
        break;

      default:
        break;
    }
  }
}
