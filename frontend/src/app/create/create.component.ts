import { Component, OnInit} from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {ApiserviceService} from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit 
{
  constructor (private service:ApiserviceService, private router:ActivatedRoute) {}

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.paramMap.get('id');

    if (this.getparamid)
    {
      this.service.getSingleData(this.getparamid).subscribe((res)=>{

        console.log(res,'res===>');
  
        this.userForm.patchValue({
          title:res.data[0].title,
          description:res.data[0].description
        });
      });
    }

  }

  userForm = new FormGroup({
    'title':new FormControl('',Validators.required),
    'description':new FormControl('',Validators.required)
  });

  //create new user

  userSubmit()
  {
    if (this.userForm.valid)
    {
      console.log(this.userForm.value);

      this.service.createData(this.userForm.value).subscribe((res)=>{
        console.log(res,'res==>');

        this.userForm.reset();
        this.successmsg = res.message;
      });

    }
    else
    {
      this.errormsg = 'all fields are required!';
    }
  }

  //update data
  userUpdate()
  {
    console.log(this.userForm.value,'updatedform');

    if (this.userForm.valid)
    {
      this.service.updateData(this.userForm.valid,this.getparamid).subscribe((res)=>{

        console.log(res,'resupdated');
        this.successmsg = res.message;

      });
    }
    else
    {
      this.errormsg = 'all fields are required';
    }
  }

}
