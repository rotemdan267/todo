import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

interface Task {
  name: string;
  isUpdated: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  tasks: Task[] = [];

  constructor() {
    this.tasks = [
      { name: 'task 1', isUpdated: false },
      { name: 'task 2', isUpdated: false },
      { name: 'task 3', isUpdated: false },
    ]
  }

  ngOnInit(): void {
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


  handleSubmitUpdate(newName:string, oldName:string) {
    
    let updatedTask = this.tasks.filter(t => t.name === oldName)[0];
    updatedTask.name = newName;
    updatedTask.isUpdated = false;
  }
}
