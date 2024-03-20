import { Component } from '@angular/core';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  name  = {
    value : "0",
    msg : "error msg here"
  }

  email = {
    value : "0",
    msg : "error msg here"
  }
  handleName(nameV:HTMLInputElement){
    this.name.value = nameV.value
  }
  handleEmail(emailV:HTMLInputElement){
    this.email.value = emailV.value
  }
  handleSubmit(event : MouseEvent){
    if(!(this.name.value === "Younes" && this.email.value === "Younes@gmail.com")){
      event.preventDefault()
    }
    
    console.log(this.name.value,this.email.value)
  }
}
