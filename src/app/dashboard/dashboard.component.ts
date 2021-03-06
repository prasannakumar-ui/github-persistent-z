import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tabledataarray:any
  openModal=false;
  isEditable=false;
  r:any;
  pageObj: any;
  currentPage = 1;
  detailsForm=new FormGroup({
    id:new FormControl(''),
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    Id: new FormControl(''),
    gender: new FormControl('',Validators.required),
    grade: new FormControl('',Validators.required),
  }) 
  firstName: void;
  constructor(private service:ServiceService) { 
    this.tabledata()
  }

  ngOnInit(): void {
  }
  tabledata(){
    this.service.getallData().subscribe(res=>{
      console.log(res);
      this.tabledataarray=res;

    })
  }
  savedata(){
    console.log(this.detailsForm.value);
    this.service.postdata(this.detailsForm.value).subscribe(res=>{
      this.tabledata()
      this.detailsForm.reset()
    })
  }
  pageChange(e:number){
    this.pageObj = e;
  }
  moreAction(){
    this.isEditable=true
    this.openModal=!this.openModal;
  }
  showEditList(data:any){
    console.log("22222",data)
      this.detailsForm.controls.id.setValue(data.id)
  this.detailsForm.controls.firstName.setValue(data.firstName)
    this.detailsForm.controls.lastName.setValue(data.lastName)
    this.detailsForm.controls.Id.setValue(data.Id)
    this.detailsForm.controls.gender.setValue(data.gender)
    this.detailsForm.controls.grade.setValue(data.grade)
     
  }
  fd(){
 this.service.idbaseddelete(this.r).subscribe(res=>{
      this.tabledata()
    })
  }
  deletedata(id:any){
 this.r=id
}
  updatedata(){
    this.service.idbasedupdate(this.detailsForm.value).subscribe(res=>{
      this.tabledata();
      console.log(res,"33333")
    })
  }
}
